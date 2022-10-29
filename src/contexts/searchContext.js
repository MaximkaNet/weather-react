import { createContext } from "react";
import Search from "../classes/search";

export const search = new Search();

export default SearchContext = createContext(search);