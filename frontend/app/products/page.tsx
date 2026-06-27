"use client";
import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { Product } from "@/contexts/ProductContext";

export default function ProductsPage() {
  const searchCtx = useContext(SearchContext);
  const { addToCart } = useCart();
  
  if (!searchCtx) return null;

  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy
  } = searchCtx;

  const categories = ["ipads", "laptops", "accessories"];

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-4 sm:px-8 text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6/12 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 text-center max-w-4xl leading-[1.1]">
          Consigue lo último en tecnología.
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mt-6 text-center">
          Descubre nuestra selección premium de dispositivos. Rendimiento excepcional y diseño innovador, diseñados para empujar los límites.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-10">
          {/* Categorías */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Categorías</h3>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border ${selectedCategory === cat ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'} flex items-center justify-center transition-colors`}>
                    {selectedCategory === cat && (
                      <div className="w-2 h-2 bg-black rounded-sm" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  />
                  <span className="text-sm text-white/70 capitalize group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Precio</h3>
            <div className="flex flex-col gap-4">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
              <div className="flex justify-between text-xs text-white/50">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Disponibilidad */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Disponibilidad</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-10 h-6 rounded-full transition-colors relative ${inStockOnly ? 'bg-white' : 'bg-white/20'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${inStockOnly ? 'translate-x-4 bg-black' : 'bg-white'}`} />
              </div>
              <input 
                type="checkbox"
                className="hidden"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span className="text-sm text-white/70">Solo en stock</span>
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 w-full">
            <div className="w-full sm:w-64 md:w-80 relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <p className="text-sm text-white/50">Mostrando {filteredProducts.length} productos</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-white/50">Ordenar por:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-white outline-none cursor-pointer hover:text-white/80 transition-colors"
                >
                  <option value="Recomendados" className="bg-black text-white">Recomendados</option>
                  <option value="Precio: Menor a Mayor" className="bg-black text-white">Precio: Menor a Mayor</option>
                  <option value="Precio: Mayor a Menor" className="bg-black text-white">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product: Product) => (
              <div key={product.id} className="bg-[#111111] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-white/20 transition-colors group">
                <div className="bg-white rounded-2xl p-8 mb-6 h-64 flex items-center justify-center">
                  <img src={product.image_url} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">{product.name}</h3>
                  <p className="text-lg text-white/60 font-medium">${product.price}</p>
                </div>
                <div className="mt-6 flex flex-col xl:flex-row gap-3">
                  <Link href={`/products/${product.id}`} className="flex-1 text-center text-white border border-white/20 rounded-full font-semibold px-4 py-3 transition-all hover:bg-white/10 active:scale-95">
                    Ver Detalles
                  </Link>
                  <button onClick={() => addToCart(product)} className="flex-1 text-center text-black bg-white rounded-full font-semibold px-4 py-3 transition-all hover:bg-gray-200 active:scale-95">
                    Al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-white/50 text-lg">No se encontraron productos con estos filtros.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}