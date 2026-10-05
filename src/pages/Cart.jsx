import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import BrandLogo from "../components/BrandLogo";

export default function Cart() {
  const { cart, setQuantity, removeFromCart, placeOrder } = useShop();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", paymentMethod: "Cash on delivery" });
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function submitOrder(event) {
    event.preventDefault();
    const order = placeOrder(customer);
    if (order) navigate(`/track?order=${encodeURIComponent(order.id)}`);
  }

  return (
    <div className="min-h-screen bg-silk-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-silk-100 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-950 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between"><BrandLogo imageClassName="h-11 w-11"/><Link to="/track" className="text-sm font-semibold text-wine-600">Track an order</Link></div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-wine-600"><ArrowLeft size={16}/> Continue shopping</Link>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-wine-600">Your selection</p><h1 className="mt-1 font-display text-3xl font-semibold">Shopping bag</h1></div><span className="text-sm text-slate-500">{itemCount} {itemCount === 1 ? "item" : "items"}</span></div>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-silk-100 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900"><ShoppingBag className="mx-auto text-wine-600" size={32}/><h2 className="mt-4 font-display text-2xl font-semibold">Your bag is empty</h2><p className="mt-2 text-sm text-slate-500">Browse the collections and add a saree to begin.</p><Link to="/#products" className="mt-6 inline-flex rounded-xl bg-wine-600 px-5 py-3 text-sm font-semibold text-white">Explore sarees</Link></div>
        ) : (
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <section className="space-y-4" aria-label="Items in your shopping bag">
              {cart.map(item => <article key={item.id} className="flex gap-4 rounded-2xl border border-silk-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5"><img src={item.image} alt={item.name} className="h-32 w-24 shrink-0 rounded-xl object-cover"/><div className="flex min-w-0 flex-1 flex-col"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase text-wine-600">{item.category}</p><h2 className="mt-1 font-display text-lg font-semibold">{item.name}</h2></div><button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={17}/></button></div><div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4"><div className="flex items-center gap-3"><button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-700"><Minus size={14}/></button><span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span><button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-700"><Plus size={14}/></button></div><p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p></div></div></article>)}
            </section>

            <form onSubmit={submitOrder} className="rounded-2xl border border-silk-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <h2 className="font-display text-xl font-semibold">Delivery details</h2><p className="mt-1 text-xs text-slate-500">Complete the form to place your order.</p>
              <div className="mt-5 space-y-4">
                <label className="block text-sm font-medium">Full name<input required autoComplete="name" value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-wine-500 dark:border-slate-700 dark:bg-slate-950"/></label>
                <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Email<input required type="email" autoComplete="email" value={customer.email} onChange={event => setCustomer({ ...customer, email: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-wine-500 dark:border-slate-700 dark:bg-slate-950"/></label><label className="block text-sm font-medium">Phone<input required type="tel" autoComplete="tel" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-wine-500 dark:border-slate-700 dark:bg-slate-950"/></label></div>
                <label className="block text-sm font-medium">Delivery address<textarea required autoComplete="street-address" rows={3} value={customer.address} onChange={event => setCustomer({ ...customer, address: event.target.value })} className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-wine-500 dark:border-slate-700 dark:bg-slate-950"/></label>
                <label className="block text-sm font-medium">Payment option<select value={customer.paymentMethod} onChange={event => setCustomer({ ...customer, paymentMethod: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"><option>Cash on delivery</option><option>Demo online payment (no charge)</option></select></label>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800"><div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div><div className="mt-2 flex justify-between text-lg font-bold"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div></div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Demo checkout saves this order in this browser. No payment will be charged and no courier updates are connected.</p>
              <button type="submit" className="mt-5 w-full rounded-xl bg-wine-600 px-5 py-3 font-bold text-white transition hover:bg-wine-700">Place order</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
