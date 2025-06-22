import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ErrorApiComponent } from "./index";

describe("ErrorApiComponent", () => {
  const onRetryMock = vi.fn();

  it("deve renderizar o componente corretamente", () => {
    const { container } = render(<ErrorApiComponent onRetry={onRetryMock} />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("deve conter os elementos visuais esperados", () => {
    render(<ErrorApiComponent onRetry={onRetryMock} />);
    expect(screen.getByText("Sorry!")).toBeInTheDocument();
    expect(screen.getByTestId("error-api-component")).toBeInTheDocument();
  });
});
