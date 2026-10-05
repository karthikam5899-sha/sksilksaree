import { ArrowLeft, Check, PackageCheck, Search } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import BrandLogo from "../components/BrandLogo";

const milestones = [
  { title: "Order placed", detail: "Your order has been received." },
  { title: "Preparing", detail: "The boutique is preparing your saree." },
  { title: "Shipped", detail: "Courier pickup and live tracking will appear here." },
  { title: "Delivered", detail: "Your order has reached its destination." }
];

export default function TrackOrder() {
  const { orders } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get("order") || "";
  const [query, setQuery] = useState(initialId);
  const [submittedId, setSubmittedId] = useState(initialId);
  const order = orders.find(item => item.id.toLowerCase() === submittedId.trim().toLowerCase());

  function searchOrder(event) {
    event.preventDefault();
    const id = query.trim();
    setSubmittedId(id);
    setSearchParams(id ? { order: id } : {});
  }

  return (
    <div className="min-h-screen bg-silk-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-silk-100 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950 sm:px-6"><div className="mx-auto flex max-w-4xl items-center justify-between"><BrandLogo imageClassName="h-11 w-11"/><Link to="/cart" className="text-sm font-semibold text-wine-600">Shopping bag</Link></div></header>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-wine-600"><ArrowLeft size={16}/> Back to shopping</Link>
        <div className="mt-5"><p className="text-xs font-bold uppercase tracking-widest text-wine-600">Order updates</p><h1 className="mt-1 font-display text-3xl font-semibold">Track your order</h1><p className="mt-2 text-sm text-slate-500">Enter the order ID from your confirmation.</p></div>
        <form onSubmit={searchOrder} className="mt-6 flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="order-id">Order ID</label><input id="order-id" value={query} onChange={event => setQuery(event.target.value)} placeholder="Example: SK-12345678" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-wine-500 dark:border-slate-700 dark:bg-slate-900"/><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-wine-600 px-5 py-3 font-semibold text-white hover:bg-wine-700"><Search size={17}/> Find order</button></form>

        {submittedId && !order && <p role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">No order with that ID was found in this browser. Check the ID or place a new demo order.</p>}
        {order && <section className="mt-8 rounded-2xl border border-silk-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800"><div><p className="text-xs uppercase tracking-wider text-slate-500">Order ID</p><h2 className="mt-1 font-display text-2xl font-semibold">{order.id}</h2><p className="mt-1 text-sm text-slate-500">Placed {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">{order.status}</span></div>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_.85fr]"><ol className="space-y-0">{milestones.map((milestone, index) => <li key={milestone.title} className="relative flex gap-4 pb-7 last:pb-0"><span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${index < 1 ? "bg-emerald-600 text-white" : index === 1 ? "bg-wine-600 text-white" : "border border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"}`}>{index < 1 ? <Check size={16}/> : index === 1 ? <PackageCheck size={16}/> : <span className="text-xs">{index + 1}</span>}</span>{index < milestones.length - 1 && <span className="absolute left-4 top-8 h-[calc(100%-2rem)] w-px bg-slate-200 dark:bg-slate-700"/>}<div><p className="font-semibold">{milestone.title}</p><p className="mt-1 text-sm text-slate-500">{milestone.detail}</p></div></li>)}</ol>
            <div className="rounded-xl bg-silk-50 p-4 dark:bg-slate-950"><h3 className="font-semibold">Order summary</h3><div className="mt-3 space-y-3">{order.items.map(item => <div key={item.id} className="flex justify-between gap-3 text-sm"><span>{item.name} × {item.quantity}</span><span className="shrink-0 font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span></div>)}</div><div className="mt-4 border-t border-slate-200 pt-3 text-sm dark:border-slate-700"><p className="flex justify-between font-bold"><span>Total</span><span>₹{order.total.toLocaleString("en-IN")}</span></p><p className="mt-3 text-slate-500">Delivering to {order.customer.name}</p><p className="mt-1 text-slate-500">{order.customer.address}</p><p className="mt-1 text-slate-500">Payment: {order.customer.paymentMethod}</p></div></div>
          </div><p className="mt-6 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">This demo shows order progress stored in this browser. Live courier tracking requires a shipping service integration.</p>
        </section>}
      </main>
    </div>
  );
}
