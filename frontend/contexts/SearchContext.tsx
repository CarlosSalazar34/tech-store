"use client";
import { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { ProductsContext } from "./ProductContext";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredProducts: any[]; // We will type this properly
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const productsContext = useContext(ProductsContext);
  const products = productsContext?.products || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recomendados");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Mapeo temporal para probar los filtros si el backend no los trae aún
    result = result.map((p) => {
      let cat = p.category;
      if (!cat) {
        if (p.name.toLowerCase().includes("ipad")) cat = "ipads";
        else if (p.name.toLowerCase().includes("mac") || p.name.toLowerCase().includes("laptop")) cat = "laptops";
        else cat = "accessories";
      }
      return { ...p, category: cat, inStock: p.inStock !== undefined ? p.inStock : true };
    });

    if (searchQuery) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (priceRange) {
      result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === "Precio: Menor a Mayor") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Precio: Mayor a Menor") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, inStockOnly, sortBy]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        filteredProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
