"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { BACKEND_URL } from "@/contants";

export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category?: string;
  inStock?: boolean;
}

interface ProductsContextType { 
  products: Product[];
  loading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};