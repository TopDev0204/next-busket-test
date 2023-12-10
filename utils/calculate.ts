export const calculateDiscountedPrice = (
  price: number,
  discount: number
): string => {
  const discountedPrice = price * (1 - discount / 100);
  return "€ " + discountedPrice.toFixed(2);
};
