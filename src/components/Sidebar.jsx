import { BarChart3, LayoutDashboard, LogOut, Package, Settings, ShoppingBag, Users, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const activeSection = location.hash.slice(1) || "dashboard";
  const items = [
    ["Dashboard", LayoutDashboard, "#dashboard"],
    ["Products", Package, "#products"],
    ["Orders", ShoppingBag, "#orders"],
    ["Customers", Users, "#customers"],
    ["Analytics", BarChart3, "#analytics"],
    ["Settings", Settings, "#settings"],
    ["Admin", Users, "#admin"]
  ];

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose}/>}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto bg-slate-950 p-5 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:shrink-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between">
          <BrandLogo className="text-sm text-white" imageClassName="h-11 w-11"/>
          <button onClick={onClose} aria-label="Close dashboard menu" className="lg:hidden"><X/></button>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[.25em] text-silk-300">Boutique Admin</p>
        <nav className="mt-10 space-y-2">
          {items.map(([name, Icon, href]) => (
            <a key={name} href={href} onClick={onClose} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-white/10 ${href === `#${activeSection}` ? "bg-wine-600" : "text-slate-300"}`}>
              <Icon size={18}/>{name}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-white/5 p-4">
          <p className="text-sm font-semibold">Admin account</p>
          <p className="mt-1 text-xs text-slate-400">admin@sksilkandsarees.in</p>
          <a href="/" onClick={onClose} className="mt-4 flex items-center gap-2 text-xs text-slate-300 hover:text-white"><LogOut size={15}/> Sign out</a>
        </div>
      </aside>
    </>
  );
}