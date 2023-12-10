import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { productType } from "@/types/product";
import { calculateDiscountedPrice } from "@/utils/calculate";

interface ProductCardProps {
  product: productType;
  addToBasket: (id: number) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, addToBasket }) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const viewProduct = () => {
    router.push(`/${product.id}`);
  };

  return (
    <div
      className="relative border rounded shadow hover:shadow-md transition pb-6 "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={viewProduct}
    >
      {product?.thumbnail && (
        <div className="relative p-4 h-[270px] flex items-center">
          <div className="relative max-h-[250px] min-h-[150px] overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.brand}
              width={268}
              height={268}
              className="w-full h-auto"
              key={product.thumbnail}
              priority
            />
            {product.stock === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-darkGray text-white text-sm font-rubik py-1 px-2 rounded-bl">
                Out of stock
              </div>
            )}
            <div className="absolute right-2 bottom-2">
              <div className="mx-auto my-2 flex w-full max-w-md flex-row justify-around bg-white p-2 shadow-xl mx-auto rounded-full border-white">
                <Image
                  src={"/Group.png"}
                  alt={"heart icon"}
                  width={16}
                  height={16}
                  className="w-full h-auto"
                  key={"heart-icon"}
                  priority
                />
              </div>
              <div className="mx-auto my-2 flex w-full max-w-md flex-row justify-around bg-white p-2 shadow-xl mx-auto rounded-full border-white">
                <Image
                  src={"/Vector.png"}
                  alt={"heart icon"}
                  width={16}
                  height={16}
                  className="w-full h-auto"
                  key={"heart-icon"}
                  priority
                />
              </div>
            </div>

            {product.discountPercentage ? (
              isHovering ? (
                <div className="absolute bottom-2 left-2 bg-transparent text-customRed text-xs font-bold font-rubik py-1 px-2 rounded-br">
                  -{product.discountPercentage}%
                </div>
              ) : (
                <div className="absolute bottom-2 left-2 bg-transparent text-darkGray text-xs font-bold font-rubik py-1 px-2 rounded-br">
                  {product.category}
                </div>
              )
            ) : (
              <div className="absolute bottom-2 left-2 bg-transparent text-darkGray text-xs font-bold font-rubik py-1 px-2 rounded-br">
                {product.category}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-rubik text-xs font-medium leading-[14px] text-left text-customGray">
          {product.brand}
        </h3>
        <p className="mt-2 font-rubik text-xs font-medium leading-[16.59px] text-left text-darkGray">
          {product.title}
        </p>
        <div className="flex items-baseline mt-5 mb-1">
          {product.discountPercentage ? (
            <>
              <span className="font-rubik text-md font-normal leading-[16.59px] text-left text-customGray line-through">
                € {product.price}
              </span>
              <span className="ml-2 font-rubik text-md font-medium leading-[24px] text-left text-darkGray">
                {calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                )}
              </span>
            </>
          ) : (
            <span className="font-rubik text-md font-medium leading-[24px] text-left text-darkGray">
              € {product.price}
            </span>
          )}
        </div>
        <div className="flex items-center mt-4 mb-2">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/star-4.png"
            alt="Next.js Logo"
            width={88}
            height={16}
            priority
          />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-600">({product.stock})</span>
        </div>
      </div>
      {isHovering && (
        <button
          className={`absolute bottom-0 w-full py-2 text-white ${
            product.stock === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            addToBasket(product.id);
          }}
        >
          Add to Basket
        </button>
      )}
    </div>
  );
};

export default ProductCard;
