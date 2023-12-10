import { FC } from "react";
import Image from "next/image";
import { productType } from "@/types/product";
import Modal from "./Modal";
import { calculateDiscountedPrice } from "@/utils/calculate";

interface AddToBasketDialogProps {
  isOpen: boolean;
  product: productType;
  onRequestClose: () => void;
}

const AddToBasketDialog: FC<AddToBasketDialogProps> = ({
  isOpen,
  product,
  onRequestClose,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onRequestClose} title="Successfully added to basket">
      <div className="flex items-center mt-5">
        <div className="max-h-[64px] overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.brand}
            width={64}
            height={64}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="ml-4">
          <p className="mt-1 font-rubik text-sm font-medium leading-[16.59px] text-left text-darkGray">
            {product.title}
          </p>
          <p className="mt-2 font-rubik text-sm font-medium leading-[16.59px] text-left text-darkGray">
            {product.discountPercentage
              ? calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage
                )
              : product.price}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AddToBasketDialog;
