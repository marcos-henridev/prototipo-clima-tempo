import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renderiza o Home dentro do main", () => {
    render(<Page />);
    const main = screen.getByRole("main");
    expect(main).toContainElement(
      screen.getByRole("heading", { level: 1, name: "Como está o clima?" }),
    );
  });
});
