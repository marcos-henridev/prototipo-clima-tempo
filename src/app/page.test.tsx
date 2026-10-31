import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./page";

const resposta = (body: unknown, ok = true, status = 200) =>
  Promise.resolve({ ok, status, json: () => Promise.resolve(body) });

const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
});

describe("Page", () => {
  it("renderiza o Home dentro do main com o card vazio", () => {
    render(<Page />);
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name: "Como está o clima?" }),
    );
    expect(
      screen.getByText("Pesquise uma cidade para ver o clima."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("busca a cidade e mostra o resultado no card", async () => {
    fetchMock
      .mockReturnValueOnce(
        resposta({
          results: [{ latitude: -8.05, longitude: -34.9, name: "Recife", admin1: "Pernambuco" }],
        }),
      )
      .mockReturnValueOnce(
        resposta({
          current: { temperature_2m: 27.4, weather_code: 3, is_day: 1 },
          hourly: {
            time: ["2026-10-31T09:00", "2026-10-31T10:00"],
            temperature_2m: [27.4, 28.2],
            weather_code: [3, 61],
            is_day: [1, 1],
            precipitation_probability: [5, 60],
          },
        }),
      );

    render(<Page />);
    await userEvent.type(screen.getByRole("searchbox"), "Recife{Enter}");

    expect(
      await screen.findByRole("heading", { name: "Recife, Pernambuco" }),
    ).toBeInTheDocument();
    expect(screen.getByText("27°C")).toBeInTheDocument();
    expect(screen.getByText("Nublado")).toBeInTheDocument();

    const previsao = screen.getByRole("region", { name: "Próximas horas" });
    expect(within(previsao).getAllByRole("listitem")).toHaveLength(2);
    expect(within(previsao).getByText("10:00")).toBeInTheDocument();
    expect(within(previsao).getByLabelText("Chuva: 60%")).toBeInTheDocument();
  });

  it("mostra o erro quando a cidade não existe", async () => {
    fetchMock.mockReturnValueOnce(resposta({}));

    render(<Page />);
    await userEvent.type(screen.getByRole("searchbox"), "xyzxyz{Enter}");

    expect(await screen.findByText("Cidade não encontrada")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Próximas horas" })).not.toBeInTheDocument();
  });
});
