// REF: https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib
import { describe, expect, it, vi, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../utils/tests";

import { Sample } from "./";
import { Footer } from "../Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

describe("Sample", () => {
  it("Render", async () => {
    render(<Sample />);
    expect(screen.getByTestId("element-id")).toBeInTheDocument();
  });

  it("Snapshot", async () => {
    const { asFragment } = render(<Sample />);
    expect(asFragment()).toMatchSnapshot();
  });
});
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Footer", () => {
  beforeEach(() => {
    (toast as unknown as Mock).mockClear();
    (useNavigate as Mock).mockReturnValue(vi.fn());
  });

  it("renders footer and buttons", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("button_power")).toBeInTheDocument();
  });

  it("calls toast and navigate on Power icon click", async () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(<Footer />);
    fireEvent.click(screen.getByTestId("button_power"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith("Goodbye!", { type: "info" });
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
