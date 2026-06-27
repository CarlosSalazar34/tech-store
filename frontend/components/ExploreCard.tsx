import { ReactNode } from "react";

export const ExploreCard = ({ item, icon }: { item: string, icon?: ReactNode }) => {
  return (
    <div className="group relative h-80 w-72 rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-all duration-300 hover:border-white/20">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 z-10 pointer-events-none" />
      
      <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start">
        {icon && <div className="mb-3 text-white/70 group-hover:text-white transition-colors duration-300">{icon}</div>}
        <span className="text-xl font-bold text-white capitalize">{item}</span>
      </div>
    </div>
  );
};