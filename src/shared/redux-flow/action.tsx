import { ACCESS_TOKEN, CART, CART_STORE, DELETE_CART, LOGIN, LOGOUT, REFRESH_TOKEN, USER_STORE } from "../constants/appConstants";
import { CartItemType } from "../constants/types/cart.type";
import { DeleteCartAction, GetCartAction,LoginAction, LogoutAction } from "../constants/types/redux.type";
import { UserStoreType } from "../constants/types/user.type";

export const handleLogin = (data: UserStoreType): LoginAction => {
  localStorage.setItem(USER_STORE, JSON.stringify(data));
  localStorage.setItem(ACCESS_TOKEN, data.accessToken);
  localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
  return {
    type: LOGIN,
    payload: data,
  };
};

export const handleLogout = (): LogoutAction => {
  localStorage.removeItem(USER_STORE);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(CART_STORE);
  localStorage.removeItem(REFRESH_TOKEN);
  return {
    type: LOGOUT,
  };
};

export const handleStoreCart = (cart: CartItemType[]): GetCartAction => {
  localStorage.setItem(CART_STORE, JSON.stringify(cart))
  return {
    type: CART,
    payload: cart
  }
}

export const handleRemoveCart = (): DeleteCartAction => {
  localStorage.setItem(CART_STORE, JSON.stringify([]))
  return {
    type: DELETE_CART,
    payload: []
  }
}
