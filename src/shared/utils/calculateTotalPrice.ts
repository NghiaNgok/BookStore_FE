import { bookPromotion } from "../constants/types/book.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculateTotalPrice = (list: any[]) => {
  let result: number = 0;
  if (!list) return 0;
  list.forEach((item) => {
    result += item.price;
  });
  return result;
};

export const calculateDiscount = (
  limit: number,
  price: number,
  discountPercents: Array<bookPromotion>
) => {
  if (!discountPercents) return price;
  let totalDiscountPercent = 0;
  let result: number = 0;
  discountPercents.forEach((item) => {
    totalDiscountPercent += item.promotion.discountPercents;
  });
  const totalPriceDiscount = Math.ceil((price * totalDiscountPercent) / 100);
  if(totalPriceDiscount > limit) {
    result = price - limit;
  } else {
    result = price - totalPriceDiscount;
  }
  return result;
};
