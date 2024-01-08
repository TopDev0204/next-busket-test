"use client";

import { FC, useEffect, useState } from "react";
import Script from "next/script";
import { productType, responseType } from "@/types/product";
import ProductCard from "../components/ProductCard";
import AddToBasketDialog from "../components/AddToBasketDialog";
import { fetchProducts } from "./api/routes";

const HomePage: FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [productData, setProductData] = useState<productType[]>([]);
  const [product, setProduct] = useState<productType>();

  useEffect(() => {
    setIsMounted(true);
    fetchProducts()
      .then((response) => response.json())
      .then((data: responseType) => setProductData(data.products))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToBasket = (id: number) => {
    setProduct(productData.find((item) => item.id === id));
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
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BRDLG8LSRY" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-BRDLG8LSRY', { 'debug_mode':true });
        `}
        </Script>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7 p-12">
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
