import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NoContentComponent } from "./index";

describe("NoContentComponent", () => {
  it("deve renderizar o componente corretamente", () => {
    const { container } = render(<NoContentComponent />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("deve conter elementos visuais esperados", () => {
    render(<NoContentComponent />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
