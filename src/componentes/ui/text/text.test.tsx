import { render, screen } from "@testing-library/react";
import Text from "./text";

describe("Text", () => {
  it("usa p e a variante body por padrão", () => {
    render(<Text>Olá</Text>);
    const text = screen.getByText("Olá");
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("body");
  });

  it.each([
    ["eyebrow", "P"],
    ["title", "H2"],
    ["subtitle", "H3"],
    ["caption", "P"],
  ] as const)("variante %s usa a tag %s", (variant, tag) => {
    render(<Text variant={variant}>Texto</Text>);
    const text = screen.getByText("Texto");
    expect(text.tagName).toBe(tag);
    expect(text).toHaveClass(variant);
  });

  it("permite trocar a tag com as", () => {
    render(
      <Text variant="title" as="h1">
        Título
      </Text>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Título" }),
    ).toHaveClass("title");
  });
});
