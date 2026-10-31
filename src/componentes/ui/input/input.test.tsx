import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./input";

describe("Input", () => {
  it("associa o label ao campo", () => {
    render(<Input id="cidade" label="Cidade" />);
    expect(screen.getByLabelText("Cidade")).toHaveAttribute("id", "cidade");
  });

  it("esconde o label visualmente com hideLabel, mantendo acessível", () => {
    render(<Input id="cidade" label="Cidade" hideLabel />);
    expect(screen.getByText("Cidade")).toHaveClass("visuallyHidden");
    expect(screen.getByLabelText("Cidade")).toBeInTheDocument();
  });

  it("repassa props para o input e aceita digitação", async () => {
    const onChange = jest.fn();
    render(
      <Input
        id="cidade"
        label="Cidade"
        placeholder="Digite uma cidade"
        onChange={onChange}
      />,
    );
    const input = screen.getByPlaceholderText("Digite uma cidade");
    await userEvent.type(input, "Recife");
    expect(input).toHaveValue("Recife");
    expect(onChange).toHaveBeenCalledTimes(6);
  });

  it("renderiza a action ao lado do campo", () => {
    render(
      <Input id="cidade" label="Cidade" action={<button>Buscar</button>} />,
    );
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });
});
