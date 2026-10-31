import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button", () => {
  it("renderiza o conteúdo e usa type=button por padrão", () => {
    render(<Button>Enviar</Button>);
    const button = screen.getByRole("button", { name: "Enviar" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("aceita outro type", () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("chama onClick ao clicar", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Enviar</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não chama onClick quando desabilitado", async () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Enviar
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("aplica as classes de variante, tamanho e className", () => {
    render(
      <Button variant="ghost" size="icon" className="extra">
        →
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button", "ghost", "icon", "extra");
  });
});
