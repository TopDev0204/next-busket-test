"use client";

import { FC, useEffect, useState } from "react";
import { productType } from "@/types/productType";
import ProductCard from "../components/ProductCard";
import AddToBasketDialog from "../components/AddToBasketDialog";

const products: productType[] = [
  {
    id: 1,
    title: "Example for Product Title",
    description: "",
    brand: "Supernova fashion",
    thumbnail: "https://i.dummyjson.com/data/products/1/3.jpg",
    price: 9999.99,
    rating: 5.8,
    stock: 1,
    category: "HOB",
  },
  {
    id: 2,
    title: "Example for Product Title",
    description: "",
    brand: "Supernova fashion",
    thumbnail: "https://i.dummyjson.com/data/products/1/3.jpg",
    price: 9999.99,
    discountPercentage: 35,
    rating: 5.8,
    stock: 2,
    category: "HOB",
  },
  {
    id: 3,
    title: "Example for Product Title",
    description: "",
    brand: "Supernova fashion",
    thumbnail: "https://i.dummyjson.com/data/products/1/3.jpg",
    price: 9999.99,
    discountPercentage: 35,
    rating: 5.8,
    stock: 54,
    category: "HOB",
  },
  {
    id: 4,
    title: "Example for Product Title",
    description: "",
    brand: "Supernova fashion",
    thumbnail: "https://i.dummyjson.com/data/products/1/3.jpg",
    price: 9999.99,
    discountPercentage: 35,
    rating: 5.8,
    stock: 54,
    category: "HOB",
  },
];

const HomePage: FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [productData, setProductData] = useState<productType[]>([]);
  const [product, setProduct] = useState<productType>();

  useEffect(() => {
    setIsMounted(true);
    setProductData(products);
  }, []);

  const handleAddToBasket = (id: number) => {
    setProduct(products.find((item) => item.id === id));
    setProductData(
      productData.map((product: productType) => {
        if (product.id === id && product.stock > 0)
          product.stock = product.stock - 1;
        return product;
      })
    );
    setDialogOpen(true);
  };

  if (!isMounted) return <></>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-7 p-12">
        {productData.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            addToBasket={handleAddToBasket}
          />
        ))}
      </div>
      {product && (
        <AddToBasketDialog
          isOpen={isDialogOpen}
          product={product}
          onRequestClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};

export default HomePage;
