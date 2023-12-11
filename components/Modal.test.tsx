import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal", () => {
  const mockOnClose = jest.fn();

  it("renders correctly", () => {
    render(<Modal onClose={mockOnClose}>Modal Content</Modal>);
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    const title = "Test Modal Title";
    render(
      <Modal onClose={mockOnClose} title={title}>
        Modal Content
      </Modal>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("calls onClose handler when the close button is clicked", () => {
    render(<Modal onClose={mockOnClose}>Modal Content</Modal>);
    fireEvent.click(screen.getByText("X"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
