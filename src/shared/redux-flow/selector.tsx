import { State } from "../constants/types/redux.type";

export const userSelector = (state: State) => state.user;
export const cartSelector = (state: State) => state.cart;