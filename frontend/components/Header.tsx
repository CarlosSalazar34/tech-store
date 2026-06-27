"use client";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

interface Item {
    label: string;
    url: string;
}

const ITEMS: Item[] = [
    {
        label: "principal",
        url: "/"
    },
    {
        label: "tienda",
        url: "/products"
    },
    {
        label: "soporte",
        url: "https://wa.me/584242964319"
    }
]

export const Header = () => {
    const { totalItems } = useCart();

    return <header className="flex flex-row items-center justify-around w-full fixed top-0 z-50 backdrop-blur-sm p-3 rounded-b-2xl">
        <p className="text-4xl text-white/40 font-bold tracking-tight">
            Tech Store</p>
        {
            ITEMS.map((item: Item, index: number) => {
                return (
                    <Link href={item.url} key={index} className="hover:underline text-base font-sans text-white tracking-wide transition-all hover:scale-95">{item.label}</Link>
                )
            })
        }
        <div className="flex flex-row gap-6 items-center">
            <Link href="/cart" className="relative group p-2">
                <FaShoppingCart color="white" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                        {totalItems}
                    </span>
                )}
            </Link>
            {/* <Link href="/profile">
                <BsPerson color="white" />
            </Link> */}
        </div>
    </header>
}