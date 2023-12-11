import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddToBasketDialog from "./AddToBasketDialog";

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "Next image stub";
  },
}));

describe("AddToBasketDialog", () => {
  const mockProduct = {
    id: 1,
    thumbnail: "/thumbnail.jpg",
    brand: "Test Brand",
    title: "Test Product",
    price: 100,
    discountPercentage: 10,
    description: "Test Description",
    rating: 4,
    stock: 1,
    category: "Test Category",
  };

  it("does not render when isOpen is false", () => {
    render(
      <AddToBasketDialog
        isOpen={false}
        product={mockProduct}
        onRequestClose={() => {}}
      />
    );
    expect(
      screen.queryByText("Successfully added to basket")
    ).not.toBeInTheDocument();
  });

  it("renders correctly when isOpen is true", () => {
    render(
      <AddToBasketDialog
        isOpen={true}
        product={mockProduct}
        onRequestClose={() => {}}
      />
    );
    expect(
      screen.getByText("Successfully added to basket")
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });
});
