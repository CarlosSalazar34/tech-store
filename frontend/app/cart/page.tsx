"use client";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { BACKEND_URL } from "@/contants";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // Stripe expects amounts in cents
          currency: "usd",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.error("No checkout URL returned from the server");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Hubo un error al procesar el pago. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-4 sm:px-8 text-white relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-white/40 mb-12">
          Tu Carrito
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111] rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-4">El carrito está vacío</h2>
            <p className="text-white/50 mb-8">Parece que aún no has agregado productos.</p>
            <Link href="/products" className="bg-white text-black font-semibold p-8 rounded-full hover:bg-gray-200 transition-colors">
              Explorar Tienda
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Cart Items List */}
            <div className="flex-1 flex flex-col gap-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-[#111] border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-32 h-32 bg-white rounded-2xl p-4 shrink-0 flex items-center justify-center">
                    <img src={item.image_url} alt={item.name} className="max-h-full object-contain mix-blend-multiply" />
                  </div>

                  <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-2">{item.name}</h3>
                      <p className="text-lg text-white/60 font-medium">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-4">
                <button onClick={clearCart} className="text-white/50 hover:text-white underline text-sm transition-colors">
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 sticky top-32">
                <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>

                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-white/10 text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-white font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-400 font-medium">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-medium text-white/70">Total</span>
                  <span className="text-3xl font-bold">${totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading || cart.length === 0}
                  className="w-full bg-white text-black font-bold text-lg rounded-full py-4 flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>Procesando <FaSpinner className="animate-spin" size={16} /></>
                  ) : (
                    <>Proceder al pago <FaArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-xs text-white/30 text-center mt-6 leading-relaxed">
                  Al proceder al pago, aceptas nuestros Términos de Servicio y Política de Privacidad.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
