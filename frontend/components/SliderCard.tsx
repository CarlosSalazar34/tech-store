import Link from "next/link";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image_url: string;
}

export const SliderCard = ({ id, name, price, image_url }: ProductProps) => {
    return (
        <div key={id} className="backdrop-blur-2xl bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row gap-8 w-full md:w-8/12 shrink-0 snap-center hover:bg-white/10 transition-colors duration-500 shadow-2xl overflow-hidden relative group">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <img src={image_url} alt={name} className="w-full md:w-64 h-64 object-cover rounded-2xl shrink-0 shadow-xl" />

            <div className="flex flex-col justify-between py-2 w-full z-10">
                <div className="flex flex-col gap-2">
                    <span className="text-3xl text-white font-bold tracking-tight leading-tight">{name}</span>
                    <span className="text-2xl text-white/50 font-semibold">${price}</span>
                </div>

                <Link href={`products/${id}`} className="mt-6 text-black bg-white rounded-full font-semibold transition-all active:scale-95 px-6 py-3 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    Comprar ahora
                </Link>
            </div>
        </div>
    )
}