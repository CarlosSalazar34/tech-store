"use client";

import { BACKEND_URL } from "@/contants";
import { useState } from "react";
import Link from "next/link";

export const Footer = () => {
    const [email, setEmail] = useState<string>("");
    const joinComunity = async () => { 
        try{
            const response = await fetch(`${BACKEND_URL}/join`, { 
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const data = await response.json();
            alert(`Bienvenido a la comunidad en breve te contactaremos a ${data.new_user}! ✅`)
        }catch(error){
            alert("Error al enviar tu solicitud");
        }finally{
            setEmail("");
        }
    }

    return <footer className="bg-black border-t border-white/10 py-20 px-6" data-purpose="page-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
                <h2 className="text-2xl font-extrabold mb-6">Tech Store</h2>
                <p className="text-gray-500 mb-8">Únete a nuestra comunidad para recibir las últimas actualizaciones sobre tecnología y ofertas exclusivas.</p>
                <div className="flex gap-2">
                    <input value={email} onChange={(event)=> { 
                        setEmail(event.target.value);
                    }} className="bg-[#0c111d] border-white/10 rounded-full px-6 py-3 text-white focus:ring-1 focus:ring-white focus:outline-none flex" placeholder="Email" type="email" />
                    <button onClick={joinComunity} className="bg-white text-black px-6 py-3 rounded-full font-bold">Unirse</button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div>
                    <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Tienda</h4>
                    <ul className="space-y-4 text-gray-500 text-sm">
                        <li><Link className="hover:text-white" href="#">iPhone</Link></li>
                        <li><Link className="hover:text-white" href="#">iPad</Link></li>
                        <li><Link className="hover:text-white" href="#">Mac</Link></li>
                        <li><Link className="hover:text-white" href="#">Watch</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Soporte</h4>
                    <ul className="space-y-4 text-gray-500 text-sm">
                        <li><Link className="hover:text-white" href="#">Ayuda</Link></li>
                        <li><Link className="hover:text-white" href="#">Estado del pedido</Link></li>
                        <li><Link className="hover:text-white" href="#">Devoluciones</Link></li>
                        <li><Link className="hover:text-white" href="#">Contacto</Link></li>
                    </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Siguenos</h4>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                            <span className="text-[10px] text-white">IG</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                            <span className="text-[10px] text-white">TW</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                            <span className="text-[10px text-white">FB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Tech Store Inc. Todos los derechos reservados.</p>
            <div className="flex gap-8">
                <Link className="hover:text-white" href="#">Privacidad</Link>
                <Link className="hover:text-white" href="#">Términos</Link>
                <Link className="hover:text-white" href="#">Cookies</Link>
            </div>
        </div>
    </footer>
}