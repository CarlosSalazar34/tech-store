"use client";
import { useRef } from "react";
import { SliderCard } from "@/components/SliderCard";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";


export const Slider = ({ products }: { products: Array<any> }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const firstIpad = products.find((item) =>
        item.name.toLowerCase().includes("ipad") && item.image_url
    );
    const firstIphone = products.find(item => (
        item.name.toLowerCase().includes("iphone")
    ))
    const firstHeadPhone = products.find(item => (
        item.name.toLowerCase().includes("airpods pro")
    ))


    const slide = (direction: "left" | "right") => {
        const slider = sliderRef.current;
        if (!slider) return;

        if (direction === "left") {
            slider.scrollBy({
                left: -800,
                behavior: "smooth"
            });
        } else {
            slider.scrollBy({
                left: 800,
                behavior: "smooth"
            });
        }
    };
    return (
        <div className="relative w-full group">
            {/* Left Button */}
            <button
                onClick={() => slide("left")}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 text-2xl p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:scale-105 transition-all rounded-full active:scale-95 text-white opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Slide Left"
            >
                <BiArrowFromRight />
            </button>

            {/* Slider Container */}
            <div
                ref={sliderRef}
                className="overflow-x-auto flex flex-row items-center w-full gap-8 px-4 md:px-24 py-8 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Fade edges for Apple look */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-linear-to-r from-black to-transparent z-10" />

                {firstIpad && <SliderCard id={firstIpad.id} name={firstIpad.name} price={firstIpad.price} image_url={firstIpad.image_url} />}
                {firstIphone && <SliderCard id={firstIphone.id} name={firstIphone.name} price={firstIphone.price} image_url={firstIphone.image_url} />}
                {firstHeadPhone && <SliderCard id={firstHeadPhone.id} name={firstHeadPhone.name} price={firstHeadPhone.price} image_url={firstHeadPhone.image_url} />}

                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-linear-to-l from-black to-transparent z-10" />
            </div>

            {/* Right Button */}
            <button
                onClick={() => slide("right")}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 text-2xl p-4 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:scale-105 transition-all rounded-full active:scale-95 text-white opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Slide Right"
            >
                <BiArrowFromLeft />
            </button>
        </div>
    )
}