import { render, screen } from "@testing-library/react";
import Home from "./home";

describe("Home", () => {
  beforeEach(() => render(<Home />));

  it("mostra o título principal", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: "Como está o clima?" }),
    ).toBeInTheDocument();
  });

  it("nomeia a seção pelo título", () => {
    expect(
      screen.getByRole("region", { name: "Como está o clima?" }),
    ).toBeInTheDocument();
  });

  it("mostra a busca com campo e botão acessíveis", () => {
    const search = screen.getByRole("search");
    expect(search).toContainElement(
      screen.getByRole("searchbox", { name: "Buscar cidade" }),
    );
    expect(search).toContainElement(
      screen.getByRole("button", { name: "Pesquisar cidade" }),
    );
  });

  it("mostra o card de clima atual", () => {
    expect(
      screen.getByRole("article", { name: "Clima atual" }),
    ).toBeInTheDocument();
  });
});
