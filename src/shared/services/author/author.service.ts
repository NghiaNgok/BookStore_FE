import { apiBase } from "../apiBase";
import { getAllAuthorQuery } from "./author.query";

export const fetchAllAuthor = () => apiBase(getAllAuthorQuery());
