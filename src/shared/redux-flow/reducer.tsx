import {
  CART,
  CART_STORE,
  DELETE_CART,
  LOGIN,
  LOGOUT,
  USER_STORE,
} from "../constants/appConstants";
import { CartItemType } from "../constants/types/cart.type";
import { ActionTypes, State } from "../constants/types/redux.type";
import { UserStoreType } from "../constants/types/user.type";

// Get initial user state from local storage
const storedUser = localStorage.getItem(USER_STORE);
const storedCart = localStorage.getItem(CART_STORE);
const initialUser: UserStoreType | undefined = storedUser
  ? JSON.parse(storedUser)
  : undefined;
const initialCart: CartItemType[] | undefined = storedCart
  ? JSON.parse(storedCart)
  : undefined;

// Initial state
const initState: State = {
  user: initialUser,
  cart: initialCart,
};

// Reducer
const rootReducer = (state = initState, action: ActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return {
        ...state,
        user: undefined,
        cart: undefined,
      };
    case CART:
      return { ...state, cart: action.payload };
    case DELETE_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default rootReducer;
