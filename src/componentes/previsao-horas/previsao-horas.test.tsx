import { render, screen, within } from "@testing-library/react";
import PrevisaoHoras from "./previsao-horas";

const horas = [
  { hora: "09:00", temperatura: 30.1, codigo: 1, is_day: true, chuva: 0 },
  { hora: "10:00", temperatura: 30.6, codigo: 63, is_day: true, chuva: 70 },
  { hora: "23:00", temperatura: 26.4, codigo: 0, is_day: false, chuva: null },
];

describe("PrevisaoHoras", () => {
  it("não renderiza nada sem horas", () => {
    const { container } = render(<PrevisaoHoras horas={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("mostra a seção com título e uma linha por hora", () => {
    render(<PrevisaoHoras horas={horas} />);
    expect(
      screen.getByRole("region", { name: "Próximas horas" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("mostra Agora na primeira hora e o horário nas demais", () => {
    render(<PrevisaoHoras horas={horas} />);
    const [primeira, segunda] = screen.getAllByRole("listitem");
    expect(within(primeira).getByText("Agora")).toBeInTheDocument();
    expect(within(segunda).getByText("10:00")).toBeInTheDocument();
  });

  it("mostra temperatura arredondada, condição e chance de chuva", () => {
    render(<PrevisaoHoras horas={horas} />);
    const segunda = screen.getAllByRole("listitem")[1];
    expect(within(segunda).getByText("31°")).toBeInTheDocument();
    expect(within(segunda).getByRole("img", { name: "Chuva" })).toBeInTheDocument();
    expect(within(segunda).getByLabelText("Chuva: 70%")).toBeInTheDocument();
  });

  it("usa ícone de noite e omite chuva quando a API não informa", () => {
    render(<PrevisaoHoras horas={horas} />);
    const ultima = screen.getAllByRole("listitem")[2];
    expect(within(ultima).getByText("🌙")).toBeInTheDocument();
    expect(within(ultima).queryByLabelText(/Chuva:/)).not.toBeInTheDocument();
  });
});
