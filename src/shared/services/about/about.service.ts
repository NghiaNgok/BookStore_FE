import { apiBase } from "../apiBase";
import { getAboutData } from "./about.query";

export const fetchAbout = () => apiBase(getAboutData());
