import { AddToCartType, UpdateCartItemType } from "../../constants/types/cart.type";
import { apiBase } from "../apiBase";
import { addToCart, allCartItemQuery, removeAllCartItem, removeCartItem, updateCart } from "./cart.query";

export const fetchAllCartItem = (uid: string) => apiBase(allCartItemQuery(uid));
export const updateCartItem = (data: UpdateCartItemType) => apiBase(updateCart(data));
export const deleteCartItem = (cid: string) => apiBase(removeCartItem(cid));
export const addCartItem = (data: AddToCartType) => apiBase(addToCart(data));
export const removeCurrentCart = (uid: string) => apiBase(removeAllCartItem(uid));