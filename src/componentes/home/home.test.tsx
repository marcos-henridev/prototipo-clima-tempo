import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";

describe("Home", () => {
  it("mostra o título principal e nomeia a seção por ele", () => {
    render(<Home onBuscar={jest.fn()} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Como está o clima?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Como está o clima?" }),
    ).toBeInTheDocument();
  });

  it("mostra a busca com campo e botão acessíveis", () => {
    render(<Home onBuscar={jest.fn()} />);
    const search = screen.getByRole("search");
    expect(search).toContainElement(
      screen.getByRole("searchbox", { name: "Buscar cidade" }),
    );
    expect(search).toContainElement(
      screen.getByRole("button", { name: "Pesquisar cidade" }),
    );
  });

  it("chama onBuscar com a cidade ao clicar no botão", async () => {
    const onBuscar = jest.fn();
    render(<Home onBuscar={onBuscar} />);
    await userEvent.type(screen.getByRole("searchbox"), "Recife");
    await userEvent.click(screen.getByRole("button", { name: "Pesquisar cidade" }));
    expect(onBuscar).toHaveBeenCalledWith("Recife");
  });

  it("chama onBuscar ao apertar Enter", async () => {
    const onBuscar = jest.fn();
    render(<Home onBuscar={onBuscar} />);
    await userEvent.type(screen.getByRole("searchbox"), "Natal{Enter}");
    expect(onBuscar).toHaveBeenCalledWith("Natal");
  });

  it("desabilita o botão enquanto carrega", () => {
    render(<Home onBuscar={jest.fn()} carregando />);
    expect(screen.getByRole("button", { name: "Pesquisar cidade" })).toBeDisabled();
  });

  it("renderiza o conteúdo de resultado", () => {
    render(
      <Home onBuscar={jest.fn()}>
        <p>Resultado</p>
      </Home>,
    );
    expect(screen.getByText("Resultado")).toBeInTheDocument();
  });
});
