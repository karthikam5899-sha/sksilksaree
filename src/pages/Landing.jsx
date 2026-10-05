import { ArrowRight, CheckCircle2, Crown, HandHeart, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SareeCard from "../components/SareeCard";
import Footer from "../components/Footer";
import { categories, sarees, testimonials } from "../data/sarees";
import { useShop } from "../context/ShopContext";

export default function Landing() {
  const { cart, addToCart } = useShop();
  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const filtered = useMemo(() => sarees.filter(s =>
    (!selectedCollection || s.collections.includes(selectedCollection)) &&
    `${s.name} ${s.category} ${s.region}`.toLowerCase().includes(query.toLowerCase())
  ), [query, selectedCollection]);

  return (
    <div className="min-h-screen bg-silk-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar cartCount={cart.length} />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(143,29,61,.18),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(184,117,45,.15),transparent_35%)]"/>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-wine-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-wine-700 shadow-sm dark:border-wine-700 dark:bg-slate-900 dark:text-wine-300"><Sparkles size={14}/> Curated in Tamil Nadu</span>
              <h1 className="mt-6 max-w-xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">Timeless silk, <span className="text-wine-600">woven with tradition.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">Discover a contemporary collection inspired by Kanchipuram, Madurai and Chettinad textile traditions.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#collections" className="rounded-full bg-wine-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-wine-700">Shop Collection <ArrowRight className="ml-2 inline" size={17}/></a>
                <Link to="/dashboard" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold dark:border-slate-700 dark:bg-slate-900">View Dashboard</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Curated handloom styles</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Secure checkout UI</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-[3rem] bg-wine-600/10 blur-2xl"/>
              <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl dark:border-slate-900">
                <img src={sarees[1].image} alt="Tamil Nadu inspired bridal silk saree" className="aspect-[4/5] w-full object-cover"/>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-950/75 p-4 text-white backdrop-blur">
                  <p className="text-xs uppercase tracking-widest text-silk-300">Featured</p>
                  <p className="font-display text-xl">Crimson Bridal Kanchipuram</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-sm font-bold uppercase tracking-widest text-wine-600">Explore</p><h2 className="section-title mt-2">Tamil Nadu collections</h2><p className="mt-3 max-w-2xl text-slate-500">Four curated directions for festive, bridal and everyday dressing.</p></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sarees..." className="w-full rounded-full border border-silk-200 bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-wine-300 dark:border-slate-700 dark:bg-slate-900 md:w-72"/>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => <a key={c.name} href="#products" onClick={() => setSelectedCollection(c.name)} className={`group overflow-hidden rounded-3xl bg-gradient-to-br ${c.accent} p-6 text-white shadow-lg transition hover:-translate-y-1`}>
              <Crown className="mb-10 transition group-hover:rotate-6" size={25}/>
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="mt-2 text-sm text-white/80">{c.subtitle}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">Explore <ArrowRight size={16}/></span>
            </a>)}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-wine-600">Signature edit</p><h2 className="section-title mt-2">{selectedCollection || "Best sellers"}</h2></div><div className="flex items-center gap-4"><span className="text-sm text-slate-500">{filtered.length} styles</span>{selectedCollection && <button onClick={() => setSelectedCollection("")} className="text-sm font-semibold text-wine-600 hover:text-wine-700">View all</button>}</div></div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(s => <SareeCard key={s.id} saree={s} onAdd={addToCart}/>) }
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [HandHeart, "Craft-led curation", "A portfolio concept inspired by Tamil Nadu's handloom heritage."],
              [Leaf, "Comfort first", "Everyday-friendly styles sit alongside grand festive and bridal pieces."],
              [ShieldCheck, "Boutique experience", "Clean product discovery, transparent pricing and a polished checkout journey."]
            ].map(([Icon, title, text]) => <div key={title} className="luxury-card p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-wine-50 text-wine-600 dark:bg-wine-700/20"><Icon/></div><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p></div>)}
          </div>
        </section>

        <section className="bg-wine-700 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
            <div><p className="text-sm font-bold uppercase tracking-widest text-silk-200">Wedding edit</p><h2 className="mt-2 font-display text-4xl">Make your big day feel beautifully Tamil.</h2><p className="mt-4 max-w-xl text-white/75">Explore statement zari borders, rich colours and heritage-inspired bridal styling.</p></div>
            <div className="md:text-right"><a href="#products" onClick={() => setSelectedCollection("Bridal Collection")} className="inline-flex rounded-full bg-white px-7 py-3 font-bold text-wine-700 transition hover:scale-105">Shop Bridal Collection <ArrowRight className="ml-2" size={18}/></a></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-wine-600">Loved by customers</p><h2 className="section-title mt-2">Stories from our boutique</h2></div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map(t => <div key={t.name} className="rounded-3xl border border-silk-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900"><div className="text-amber-500">★★★★★</div><p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">“{t.text}”</p><p className="mt-5 text-sm font-bold">{t.name}</p><p className="text-xs text-slate-500">{t.city}</p></div>)}
          </div>
        </section>
      </main>
      <Footer onSelectCollection={setSelectedCollection}/>
    </div>
  );
}