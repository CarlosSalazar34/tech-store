'use client';
import { useContext } from "react";
import { ProductsContext } from "@/contexts/ProductContext";
import { Slider } from "@/components/Slider";
import { ExploreCard } from "@/components/ExploreCard";
import { FaTabletAlt, FaLaptop, FaHeadphones } from "react-icons/fa";

export default function Home() {
  // const context = useContext(ProductsContext);
  const { loading, products } = useContext(ProductsContext)!;
  // const loading = context?.loading ?? true;
  // const products = context?.products ?? [];

  const CATEGORIES = [
    { name: "ipads", icon: <FaTabletAlt size={36} /> },
    { name: "laptops", icon: <FaLaptop size={36} /> },
    { name: "accessories", icon: <FaHeadphones size={36} /> }
  ];

  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-11/12 h-screen bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mt-20 md:mt-28 mb-12 flex flex-col items-center justify-center relative z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 text-center max-w-5xl leading-[1.1]">
          Consigue lo último en tecnología.
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mt-6 text-center leading-relaxed font-medium">
          Descubre nuestra selección premium de dispositivos. Rendimiento excepcional y diseño innovador, diseñados para empujar los límites.
        </p>
      </div>

      <div className="w-full max-w-11/12 flex items-center justify-center mx-auto pb-24  relative z-10">
        {loading ? (
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mt-10" />
        ) : products && products.length > 0 ? (
          <Slider products={products} />
        ) : (
          <p className="text-white/60 text-lg mt-10">No se encontraron productos disponibles.</p>
        )}
      </div>
      <section className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 text-center max-w-5xl leading-[1.1] mb-12">
          Explora por categoría
        </h2>

        {/* Contenedor con espacio y responsive */}
        <div className="flex flex-col sm:flex-row gap-6 justify-evenly items-center w-full max-w-6xl">
          {CATEGORIES.map((category, index) => (
            <div key={index} className="w-full sm:w-auto">
              <ExploreCard item={category.name} icon={category.icon} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}