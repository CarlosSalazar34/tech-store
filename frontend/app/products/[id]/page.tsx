"use client";

import { useEffect, useState, use } from "react";
import { BACKEND_URL } from "@/contants";
import { Product } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products`);
        const data: Product[] = await response.json();
        const found = data.find((p) => p.id === parseInt(id));
        if (found) {
          setProduct(found);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center pt-24 text-white">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/products" className="text-white/50 hover:text-white underline">Volver a la tienda</Link>
      </div>
    );
  }

  const colors = ["bg-blue-500", "bg-pink-400", "bg-white", "bg-yellow-300"];
  const capacities = ["128GB", "256GB", "512GB"];

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-4 sm:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 max-w-4xl leading-[1.1]">
            {product.name}
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-2xl">
            Rendimiento excepcional y diseño innovador, diseñados para empujar los límites.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column - Images */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-10 flex items-center justify-center h-4/12">
              <img src={product.image_url} alt={product.name} className="max-h-full object-contain drop-shadow-2xl mix-blend-screen" />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((thumb, idx) => (
                <div key={idx} className={`bg-[#111111] border ${idx === 0 ? 'border-white/40' : 'border-white/5'} rounded-xl aspect-square flex items-center justify-center p-4 cursor-pointer hover:border-white/20 transition-colors`}>
                  {idx === 0 ? (
                     <div className="text-xs font-bold text-white/50">FRONT</div>
                  ) : (
                    <img src={product.image_url} className="max-h-full object-contain opacity-50 mix-blend-screen" alt="thumb" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex-1 flex flex-col">
            <div className="inline-block border border-white/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wider text-white/70 w-max mb-6">
              NEW ARRIVAL
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{product.name}</h2>
            <p className="text-2xl text-white/80 font-medium mb-10">${product.price}</p>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-sm text-white/50 font-semibold mb-4">Selecciona Color</h3>
              <div className="flex gap-4">
                {colors.map((color, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full ${color} flex items-center justify-center transition-all ${selectedColor === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Capacity */}
            <div className="mb-10">
              <h3 className="text-sm text-white/50 font-semibold mb-4">Capacidad</h3>
              <div className="flex gap-4">
                {capacities.map((cap) => (
                  <button
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={`px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${selectedCapacity === cap ? 'bg-white text-black border-white' : 'bg-[#111] text-white border-white/10 hover:border-white/30'}`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Box */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-10">
              <h4 className="text-xs font-bold text-white/50 tracking-wider mb-4 uppercase">Especificaciones Clave</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" /> Pantalla Liquid Retina de 10.9"
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" /> Chip A16 Bionic con Neural Engine
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" /> Cámara trasera y frontal gran angular de 12 MP
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" /> Conector USB-C para carga y accesorios
                </li>
              </ul>
            </div>

            {/* Buy Button */}
            <button 
              onClick={() => {
                addToCart(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="w-full bg-white text-black font-bold text-lg rounded-full py-4 hover:bg-gray-200 transition-colors active:scale-[0.98] relative overflow-hidden"
            >
              {added ? "¡Añadido al carrito!" : "Agregar al carrito"}
            </button>
            <p className="text-xs text-white/30 text-center mt-4">Envío gratis a todo el mundo. Devoluciones en 30 días.</p>
          </div>
        </div>

        {/* Technical Details Section */}
        <div className="mt-32 pt-20 border-t border-white/10">
          <h2 className="text-3xl font-bold text-center mb-16">Detalles técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-white/50 text-sm mb-2">Pantalla</h4>
              <p className="text-xl font-medium">10.9" Multi-Touch</p>
            </div>
            <div>
              <h4 className="text-white/50 text-sm mb-2">Procesador</h4>
              <p className="text-xl font-medium">A16 Bionic Chipset</p>
            </div>
            <div>
              <h4 className="text-white/50 text-sm mb-2">Resolución</h4>
              <p className="text-xl font-medium">2360 x 1640 píxeles</p>
            </div>
            <div>
              <h4 className="text-white/50 text-sm mb-2">Batería</h4>
              <p className="text-xl font-medium">Hasta 10 horas de autonomía</p>
            </div>
            <div>
              <h4 className="text-white/50 text-sm mb-2">Seguridad</h4>
              <p className="text-xl font-medium">Touch ID en el botón superior</p>
            </div>
            <div>
              <h4 className="text-white/50 text-sm mb-2">Peso</h4>
              <p className="text-xl font-medium">477 gramos</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}