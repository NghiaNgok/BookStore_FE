import { BookQuery } from "../../constants/types/book.type";
import { apiBase } from "../apiBase";
import { getAllBook, getDetailBook, updateRate } from "./book.query";

export const fetchAllBooks = (data?: BookQuery) => apiBase(getAllBook(data));
export const fetchOneBook = (id: string) => apiBase(getDetailBook(id));
export const fetchUpdateRate = (id: string) => apiBase(updateRate(id));