import { apiBase } from "../apiBase";
import { getAllCategoryQuery } from "./category.query";

export const fetchAllCategory = () => apiBase(getAllCategoryQuery());

