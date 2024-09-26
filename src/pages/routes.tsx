/* eslint-disable react-refresh/only-export-components */
import { ComponentType, lazy } from "react";

import { AUTH_PATH, CUSTOMER_PATH, ERROR_PATH, SUCCESS_PATH } from "../shared/constants/path";

const HomePage = lazy(() => import("./home"));
const ShopPage = lazy(() => import("./shop"));
const AboutPage = lazy(() => import("./about"));
const CartPage = lazy(() => import("./cart"));
const SignInPage = lazy(() => import("./auth/signin"));
const SignUpPage = lazy(() => import("./auth/signup"));
const ProfilePage = lazy(() => import("./profile"));
const DetailPage = lazy(() => import("./detail"));
const OrderPage = lazy(() => import("./order"));

const PageNotFound = lazy(() => import("./errors/pageNotFound"));
const ErrorPage = lazy(() => import("./errors/errorPage"));

const OrderSuccessPage = lazy(() => import("./success/submitOrderSuccess"));

interface RouteObject {
  path: string;
  component: ComponentType;
  exact?: boolean; // Add other route-specific properties as needed
  protected?: boolean; // check if routes is need to be protected
}

const pageRoutes: RouteObject[] = [
  // PROTECTED PAGE
  {
    path: CUSTOMER_PATH.PROFILE,
    exact: true,
    component: ProfilePage,
    protected: true,
  },
  {
    path: CUSTOMER_PATH.CART,
    exact: true,
    component: CartPage,
    protected: true,
  },
  {
    path: CUSTOMER_PATH.ORDER,
    exact: true,
    component: OrderPage
  },
  // ERROR PAGE
  {
    path: ERROR_PATH.PAGE_NOT_FOUND,
    exact: true,
    component: PageNotFound,
  },
  {
    path: ERROR_PATH.ERROR_PAGE,
    exact: true,
    component: ErrorPage,
  },
  // SUCCESS PAGE
  {
    path: SUCCESS_PATH.ORDER_SUCCESS,
    exact: true,
    component: OrderSuccessPage,
  },
  // PUBLIC PAGE
  {
    path: CUSTOMER_PATH.DETAIL_PRODUCT,
    exact: true,
    component: DetailPage,
  },
  {
    path: AUTH_PATH.SIGNIN,
    exact: true,
    component: SignInPage,
  },
  {
    path: AUTH_PATH.SIGNUP,
    exact: true,
    component: SignUpPage,
  },
  {
    path: CUSTOMER_PATH.HOME,
    exact: true,
    component: HomePage,
  },
  {
    path: CUSTOMER_PATH.SHOP,
    exact: true,
    component: ShopPage,
  },
  {
    path: CUSTOMER_PATH.ABOUT,
    exact: true,
    component: AboutPage,
  },
];

export default pageRoutes;
