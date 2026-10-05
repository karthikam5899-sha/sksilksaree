import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { careItems } from "../data/customerCare";
import BrandLogo from "./BrandLogo";

export default function Footer({ onSelectCollection }) {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <BrandLogo showName={false} imageClassName="h-28 w-28 shadow-lg"/>
          <p className="mt-3 text-sm leading-6 text-slate-400">A modern boutique concept inspired by the timeless handloom traditions of Tamil Nadu.</p>
          <div className="mt-5 flex gap-3">
            <a className="rounded-full bg-white/10 p-2 hover:bg-wine-600"><Instagram size={17}/></a>
            <a className="rounded-full bg-white/10 p-2 hover:bg-wine-600"><Facebook size={17}/></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Collections</h4>
          <ul className="mt-4 space-y-3 text-sm">{collections.map(([label, collection]) => <li key={label}><a href="#products" onClick={() => onSelectCollection?.(collection)} className="text-left transition hover:text-white">{label}</a></li>)}</ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Customer Care</h4>
          <ul className="mt-4 space-y-3 text-sm">{careItems.map(item => <li key={item.slug}><Link to={`/care/${item.slug}`} className="transition hover:text-white">{item.title}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex gap-2"><MapPin size={17}/> Tamil Nadu, India</p>
            <p className="flex gap-2"><Phone size={17}/> +91 98765 43210</p>
            <p className="flex gap-2"><Mail size={17}/> hello@sksilkandsarees.in</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">© 2026 SK Silk &amp; Saree's. Demo portfolio project.</div>
    </footer>
  );
}
const collections = [
  ["Kanchipuram Silk", "Kanchipuram Silk"],
  ["Madurai Sungudi", "Madurai Sungudi"],
  ["Chettinad Cotton", "Chettinad Cotton"],
  ["Bridal Sarees", "Bridal Collection"]
];
