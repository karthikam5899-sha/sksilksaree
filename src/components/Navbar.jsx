import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";

export default function Navbar({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "/"],
    ["Collections", "/#collections"],
    ["About", "/#about"],
    ["Track order", "/track"],
    ["Dashboard", "/dashboard"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-silk-100 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo subtitle="Tamil Nadu Silks" className="text-slate-900 dark:text-white" imageClassName="h-11 w-11 shadow-lg"/>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-slate-600 transition hover:text-wine-600 dark:text-slate-300">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="hidden rounded-full border border-silk-200 p-2.5 text-slate-700 md:block dark:border-slate-700 dark:text-slate-200"><Heart size={18}/></button>
          <Link to="/cart" aria-label={`Shopping bag, ${cartCount} items`} className="relative rounded-full bg-wine-600 p-2.5 text-white">
            <ShoppingBag size={18}/>
            {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-silk-500 text-[10px] font-bold">{cartCount}</span>}
          </Link>
          <button className="rounded-full border border-silk-200 p-2.5 md:hidden dark:border-slate-700" onClick={() => setOpen(!open)}>
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-silk-100 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-medium hover:bg-silk-50 dark:hover:bg-slate-900">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}