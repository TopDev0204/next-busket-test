import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { productType } from "@/types/productType";
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
      className="relative border rounded shadow hover:shadow-md transition pb-4 "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={viewProduct}
    >
      {product?.thumbnail && (
        <div className="relative p-4">
          <Image
            src={product.thumbnail}
            alt={product.brand}
            width={268}
            height={268}
            className="w-full"
            key={product.thumbnail}
            priority
          />
          {product.stock === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-darkGray text-white text-sm font-rubik py-1 px-2 rounded-bl">
              Out of stock
            </div>
          )}
          <div className="absolute right-6 bottom-6">
            <div className="mx-auto my-2 flex w-full max-w-md flex-row justify-around bg-white p-3 shadow-xl mx-auto rounded-full border-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6667 15C13.9554 15 15 13.9553 15 12.6666C15 11.378 13.9554 10.3333 12.6667 10.3333C11.378 10.3333 10.3334 11.378 10.3334 12.6666C10.3334 13.9553 11.378 15 12.6667 15Z"
                  stroke="#1B1B1B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.33333 5.66667C4.622 5.66667 5.66667 4.622 5.66667 3.33333C5.66667 2.04467 4.622 1 3.33333 1C2.04467 1 1 2.04467 1 3.33333C1 4.622 2.04467 5.66667 3.33333 5.66667Z"
                  stroke="#1B1B1B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.77783 3.3333H11.1112C11.5237 3.3333 11.9194 3.49719 12.2111 3.78891C12.5028 4.08063 12.6667 4.47629 12.6667 4.88885V10.3333"
                  stroke="#1B1B1B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.22226 12.6667H4.88893C4.47637 12.6667 4.08071 12.5028 3.78899 12.2111C3.49726 11.9194 3.33337 11.5237 3.33337 11.1111V5.6667"
                  stroke="#1B1B1B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="mx-auto my-2 flex w-full max-w-md flex-row justify-around bg-white p-3 shadow-xl mx-auto rounded-full border-white">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.99503 2.23319C6.5455 0.609985 4.12832 0.173347 2.31215 1.65972C0.495992 3.14609 0.240302 5.63122 1.66654 7.38916L7.99503 13.25L14.3235 7.38916C15.7498 5.63122 15.5253 3.13045 13.6779 1.65972C11.8305 0.188982 9.44457 0.609985 7.99503 2.23319Z"
                  stroke="#1B1B1B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          {product.stock > 0 &&
            (product.discountPercentage ? (
              <div className="absolute bottom-6 left-6 bg-transparent text-customRed text-xs font-bold font-rubik py-1 px-2 rounded-br">
                -{product.discountPercentage}%
              </div>
            ) : (
              <div className="absolute bottom-6 left-6 bg-transparent text-darkGray text-xs font-bold font-rubik py-1 px-2 rounded-br">
                {product.category}
              </div>
            ))}
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
          className={`absolute w-full py-2 text-white ${
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
