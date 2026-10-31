import { renderHook, waitFor } from "@testing-library/react";
import { useClima } from "./hookcustumer";

const resposta = (body: unknown, ok = true, status = 200) =>
  Promise.resolve({ ok, status, json: () => Promise.resolve(body) });

const geoSaoPaulo = {
  results: [
    { latitude: -23.55, longitude: -46.63, name: "São Paulo", admin1: "São Paulo" },
  ],
};

const climaSaoPaulo = {
  current: { temperature_2m: 22.5, weather_code: 3, is_day: 1 },
};

const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
});

describe("useClima", () => {
  it("não busca nada com cidade vazia", () => {
    const { result } = renderHook(() => useClima("   "));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current).toEqual({ dados: null, carregando: false, erro: null });
  });

  it("busca a cidade e o clima e retorna os dados", async () => {
    fetchMock
      .mockReturnValueOnce(resposta(geoSaoPaulo))
      .mockReturnValueOnce(resposta(climaSaoPaulo));

    const { result } = renderHook(() => useClima("São Paulo"));

    expect(result.current.carregando).toBe(true);
    await waitFor(() => expect(result.current.carregando).toBe(false));

    expect(result.current.erro).toBeNull();
    expect(result.current.dados).toEqual({
      local: "São Paulo, São Paulo",
      temperatura: 22.5,
      is_day: true,
      codigo: 3,
    });

    const [geoUrl] = fetchMock.mock.calls[0];
    expect(geoUrl).toContain("geocoding-api.open-meteo.com");
    expect(geoUrl).toContain("name=S%C3%A3o+Paulo");

    const [climaUrl] = fetchMock.mock.calls[1];
    expect(climaUrl).toContain("latitude=-23.55");
    expect(climaUrl).toContain("current=temperature_2m%2Cweather_code%2Cis_day");
  });

  it("mostra só o nome quando não há estado (admin1)", async () => {
    fetchMock
      .mockReturnValueOnce(
        resposta({ results: [{ latitude: 1, longitude: 2, name: "Mônaco" }] }),
      )
      .mockReturnValueOnce(resposta(climaSaoPaulo));

    const { result } = renderHook(() => useClima("Mônaco"));
    await waitFor(() => expect(result.current.dados).not.toBeNull());
    expect(result.current.dados?.local).toBe("Mônaco");
  });

  it("retorna erro quando a cidade não existe", async () => {
    fetchMock.mockReturnValueOnce(resposta({ generationtime_ms: 0.05 }));

    const { result } = renderHook(() => useClima("xyzxyz"));
    await waitFor(() => expect(result.current.erro).toBe("Cidade não encontrada"));
    expect(result.current.dados).toBeNull();
    expect(result.current.carregando).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retorna erro quando a API de clima falha", async () => {
    fetchMock
      .mockReturnValueOnce(resposta(geoSaoPaulo))
      .mockReturnValueOnce(resposta({}, false, 400));

    const { result } = renderHook(() => useClima("São Paulo"));
    await waitFor(() => expect(result.current.erro).toBe("Erro: 400"));
    expect(result.current.dados).toBeNull();
  });

  it("cancela a busca anterior quando a cidade muda", async () => {
    fetchMock
      .mockReturnValueOnce(new Promise(() => {}))
      .mockReturnValueOnce(resposta(geoSaoPaulo))
      .mockReturnValueOnce(resposta(climaSaoPaulo));

    const { result, rerender } = renderHook(({ cidade }) => useClima(cidade), {
      initialProps: { cidade: "Rio" },
    });
    const primeiroSignal: AbortSignal = fetchMock.mock.calls[0][1].signal;

    rerender({ cidade: "São Paulo" });
    expect(primeiroSignal.aborted).toBe(true);

    await waitFor(() => expect(result.current.dados?.temperatura).toBe(22.5));
  });
});
