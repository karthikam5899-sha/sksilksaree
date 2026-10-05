import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

export default function SareeCard({ saree, onAdd }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="luxury-card group overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-silk-100 dark:bg-slate-800">
        <img src={saree.image} alt={saree.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-wine-700 shadow dark:bg-slate-950/90">{saree.badge}</span>
        <button onClick={() => setLiked(!liked)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-wine-600 shadow dark:bg-slate-950/90">
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-5">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-wine-600">{saree.region}</span>
          <span className="flex items-center gap-1 text-xs font-semibold"><Star size={13} fill="currentColor" className="text-amber-500"/> {saree.rating}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{saree.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{saree.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">₹{saree.price.toLocaleString("en-IN")}</span>
            <span className="ml-2 text-sm text-slate-400 line-through">₹{saree.oldPrice.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={() => onAdd(saree)} aria-label={`Add ${saree.name} to shopping bag`} title="Add to shopping bag" className="rounded-full bg-slate-900 p-3 text-white transition hover:scale-105 hover:bg-wine-600 dark:bg-white dark:text-slate-900">
            <ShoppingBag size={17}/>
          </button>
        </div>
      </div>
    </article>
  );
}