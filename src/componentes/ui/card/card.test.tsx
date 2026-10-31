import { render, screen } from "@testing-library/react";
import Card from "./card";

describe("Card", () => {
  it("renderiza uma div por padrão com o conteúdo", () => {
    render(<Card data-testid="card">Conteúdo</Card>);
    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveTextContent("Conteúdo");
    expect(card).toHaveClass("card");
  });

  it("permite trocar a tag com as e repassa atributos", () => {
    render(<Card as="article" aria-label="Clima atual" className="extra" />);
    const card = screen.getByRole("article", { name: "Clima atual" });
    expect(card).toHaveClass("card", "extra");
  });
});
