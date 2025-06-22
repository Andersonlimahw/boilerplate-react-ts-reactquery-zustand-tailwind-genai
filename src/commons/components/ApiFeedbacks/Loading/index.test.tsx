import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingComponent } from "./index";

describe("LoadingComponent", () => {
  it("deve renderizar o componente corretamente", () => {
    const { container } = render(<LoadingComponent />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("deve conter os elementos visuais esperados", () => {
    render(<LoadingComponent />);
    expect(screen.getByLabelText("loading")).toBeInTheDocument();
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });
});
