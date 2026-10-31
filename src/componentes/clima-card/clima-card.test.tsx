import { render, screen } from "@testing-library/react";
import ClimaCard from "./clima-card";

const dados = { local: "Recife, Pernambuco", temperatura: 28.6, is_day: true, codigo: 0, horas: [] };

describe("ClimaCard", () => {
  it("mostra o estado inicial sem dados", () => {
    render(<ClimaCard dados={null} carregando={false} erro={null} />);
    expect(
      screen.getByText("Pesquise uma cidade para ver o clima."),
    ).toBeInTheDocument();
  });

  it("mostra o carregando e marca o card como ocupado", () => {
    render(<ClimaCard dados={null} carregando erro={null} />);
    expect(screen.getByText("Buscando o clima…")).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Clima atual" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });

  it("mostra a mensagem de erro", () => {
    render(<ClimaCard dados={null} carregando={false} erro="Cidade não encontrada" />);
    expect(screen.getByText("Cidade não encontrada")).toBeInTheDocument();
  });

  it("mostra local, temperatura arredondada e descrição", () => {
    render(<ClimaCard dados={dados} carregando={false} erro={null} />);
    expect(
      screen.getByRole("heading", { name: "Recife, Pernambuco" }),
    ).toBeInTheDocument();
    expect(screen.getByText("29°C")).toBeInTheDocument();
    expect(screen.getByText("Céu limpo")).toBeInTheDocument();
    expect(screen.getByText("Dia")).toBeInTheDocument();
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("mostra Noite e lua quando não é dia", () => {
    render(
      <ClimaCard dados={{ ...dados, is_day: false }} carregando={false} erro={null} />,
    );
    expect(screen.getByText("Noite")).toBeInTheDocument();
    expect(screen.getByText("🌙")).toBeInTheDocument();
  });

  it("anuncia mudanças para leitores de tela", () => {
    render(<ClimaCard dados={null} carregando={false} erro={null} />);
    expect(screen.getByRole("article")).toHaveAttribute("aria-live", "polite");
  });
});
