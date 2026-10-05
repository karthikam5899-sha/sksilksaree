import { Bell, CheckCheck, DollarSign, Menu, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ThemeToggle from "../components/ThemeToggle";
import { sarees } from "../data/sarees";

const sales = [
  { month: "Jan", revenue: 2.2, orders: 112 }, { month: "Feb", revenue: 2.8, orders: 138 },
  { month: "Mar", revenue: 3.1, orders: 152 }, { month: "Apr", revenue: 3.6, orders: 181 },
  { month: "May", revenue: 4.1, orders: 210 }, { month: "Jun", revenue: 4.8, orders: 246 }
];

const categoryData = [
  { name: "Kanchi", sales: 82 }, { name: "Sungudi", sales: 56 }, { name: "Chettinad", sales: 44 }, { name: "Bridal", sales: 68 }
];

const notifications = [
  { title: "New order received", detail: "Order #SA-1048 · ₹12,999", time: "10 minutes ago" },
  { title: "Order is being processed", detail: "Order #SA-1046 · Madurai Sungudi", time: "1 hour ago" },
  { title: "Collection performance is up", detail: "Kanchipuram Silk sales increased this month.", time: "Yesterday" }
];

const customers = [
  { name: "Shalini R.", order: "#SA-1048", spent: "₹12,999", status: "Returning" },
  { name: "Meenakshi P.", order: "#SA-1047", spent: "₹2,899", status: "Returning" },
  { name: "Divya K.", order: "#SA-1046", spent: "₹3,999", status: "New" },
  { name: "Priya S.", order: "#SA-1045", spent: "₹18,999", status: "Returning" }
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.length);
  const [settings, setSettings] = useState({ orderAlerts: true, stockAlerts: true });
  const orders = [
    ["#SA-1048", "Shalini R.", "Kanchipuram Temple Zari", "₹12,999", "Paid"],
    ["#SA-1047", "Meenakshi P.", "Chettinad Green Kandaangi", "₹2,899", "Paid"],
    ["#SA-1046", "Divya K.", "Madurai Sungudi Zari", "₹3,999", "Processing"],
    ["#SA-1045", "Priya S.", "Crimson Bridal Kanchipuram", "₹18,999", "Shipped"]
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar open={open} onClose={() => setOpen(false)}/>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:px-6 lg:px-8">
          <button onClick={()=>setOpen(true)} aria-label="Open dashboard menu" aria-expanded={open} className="rounded-xl border p-2 lg:hidden"><Menu size={20}/></button>
          <div className="hidden lg:block"><p className="text-xs uppercase tracking-widest text-wine-600">Overview</p><h1 className="font-display text-2xl font-semibold">Boutique Dashboard</h1></div>
          <div className="relative ml-auto flex items-center gap-2"><ThemeToggle/><button onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications" aria-expanded={notificationsOpen} className="relative rounded-full border p-2.5"><Bell size={18}/>{unreadNotifications > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-wine-600 px-1 text-[10px] font-bold text-white">{unreadNotifications}</span>}</button><a href="#admin" className="hidden rounded-full bg-wine-600 px-4 py-2 text-xs font-bold text-white sm:block">Admin</a>
            {notificationsOpen && <div className="absolute right-0 top-14 z-40 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"><div className="flex items-center justify-between"><h2 className="font-display text-lg font-semibold">Notifications</h2><button onClick={() => setUnreadNotifications(0)} disabled={unreadNotifications === 0} className="flex items-center gap-1 text-xs font-semibold text-wine-600 disabled:text-slate-400"><CheckCheck size={15}/> Read all</button></div><div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">{notifications.map((notification, index) => <div key={notification.title} className={`py-3 ${index < unreadNotifications ? "" : "opacity-60"}`}><p className="text-sm font-semibold">{notification.title}</p><p className="mt-1 text-xs text-slate-500">{notification.detail}</p><p className="mt-1 text-[11px] text-slate-400">{notification.time}</p></div>)}</div></div>}
          </div>
        </header>

        <div id="dashboard" className="space-y-8 scroll-mt-24 p-4 sm:p-6 lg:p-8">
          <div className="lg:hidden"><p className="text-xs uppercase tracking-widest text-wine-600">Overview</p><h1 className="font-display text-2xl font-semibold dark:text-white">Boutique Dashboard</h1></div>

          <section aria-label="Dashboard overview" className="grid scroll-mt-24 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Revenue" value="₹18.6L" change="+18.4% this month" icon={DollarSign}/>
            <StatCard label="Orders" value="1,248" change="+12.8% this month" icon={ShoppingCart}/>
            <StatCard label="Customers" value="4,892" change="+9.2% this month" icon={Users}/>
            <StatCard label="Products" value="186" change="+14 new styles" icon={Package}/>
          </section>

          <section id="products" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6"><h2 className="font-display text-xl font-semibold">Products</h2><p className="text-xs text-slate-500">Current saree catalog and listed prices</p></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-950"><tr><th className="px-6 py-4">Product</th><th className="px-6 py-4">Collection</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Status</th></tr></thead><tbody>{sarees.map(s => <tr key={s.id} className="border-t border-slate-100 dark:border-slate-800"><td className="px-6 py-4 font-semibold">{s.name}</td><td className="px-6 py-4">{s.category}</td><td className="px-6 py-4">₹{s.price.toLocaleString("en-IN")}</td><td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span></td></tr>)}</tbody></table></div>
          </section>

          <section id="analytics" className="grid scroll-mt-24 gap-6 xl:grid-cols-[1.7fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold">Revenue overview</h2><p className="text-xs text-slate-500">Monthly revenue in lakh ₹</p></div><TrendingUp className="text-emerald-600"/></div>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sales}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8f1d3d" stopOpacity={0.35}/><stop offset="100%" stopColor="#8f1d3d" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="revenue" stroke="#8f1d3d" fill="url(#fill)" strokeWidth={3}/></AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <h2 className="font-display text-xl font-semibold">Collection performance</h2><p className="text-xs text-slate-500">Sales index by collection</p>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number"/><YAxis type="category" dataKey="name" width={70}/><Tooltip/><Bar dataKey="sales" fill="#b8752d" radius={[0,8,8,0]}/></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section id="customers" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6"><h2 className="font-display text-xl font-semibold">Customers</h2><p className="text-xs text-slate-500">Recent customer activity</p></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-950"><tr><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Latest order</th><th className="px-6 py-4">Order value</th><th className="px-6 py-4">Status</th></tr></thead><tbody>{customers.map(customer => <tr key={customer.name} className="border-t border-slate-100 dark:border-slate-800"><td className="px-6 py-4 font-semibold">{customer.name}</td><td className="px-6 py-4">{customer.order}</td><td className="px-6 py-4">{customer.spent}</td><td className="px-6 py-4">{customer.status}</td></tr>)}</tbody></table></div>
          </section>

          <section id="orders" className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6"><div><h2 className="font-display text-xl font-semibold">Recent orders</h2><p className="text-xs text-slate-500">Latest customer purchases</p></div><button className="rounded-full bg-wine-600 px-4 py-2 text-xs font-bold text-white">View all</button></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-950"><tr><th className="px-6 py-4">Order</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Product</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr></thead>
              <tbody>{orders.map(o=><tr key={o[0]} className="border-t border-slate-100 dark:border-slate-800"><td className="px-6 py-4 font-semibold">{o[0]}</td><td className="px-6 py-4">{o[1]}</td><td className="px-6 py-4">{o[2]}</td><td className="px-6 py-4 font-semibold">{o[3]}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${o[4]==="Paid"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{o[4]}</span></td></tr>)}</tbody></table>
            </div>
          </section>

          <section id="inventory" className="grid scroll-mt-24 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-display text-xl font-semibold">Inventory overview</h2><div className="mt-5 space-y-4">{sarees.slice(0,4).map(s=><div key={s.id} className="flex items-center gap-4"><img src={s.image} className="h-14 w-12 rounded-xl object-cover" alt=""/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{s.name}</p><p className="text-xs text-slate-500">{s.region} · {s.rating} ★</p></div><span className="text-sm font-bold">₹{s.price.toLocaleString("en-IN")}</span></div>)}</div></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-display text-xl font-semibold">Inventory health</h2><div className="mt-6 space-y-5">{[["Kanchipuram Silk",78],["Madurai Sungudi",62],["Chettinad Cotton",44],["Bridal Collection",31]].map(([n,v])=><div key={n}><div className="mb-2 flex justify-between text-xs font-semibold"><span>{n}</span><span>{v}%</span></div><div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-2 rounded-full bg-wine-600" style={{width:`${v}%`}}/></div></div>)}</div></div>
          </section>

          <section id="settings" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-xl font-semibold">Settings</h2><p className="mt-1 text-xs text-slate-500">Store notifications and contact details</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2"><div className="space-y-4"><label className="flex items-center justify-between gap-4 text-sm"><span>Order notifications</span><input type="checkbox" checked={settings.orderAlerts} onChange={e => setSettings(current => ({ ...current, orderAlerts: e.target.checked }))} className="h-4 w-4 accent-wine-600"/></label><label className="flex items-center justify-between gap-4 text-sm"><span>Low-stock notifications</span><input type="checkbox" checked={settings.stockAlerts} onChange={e => setSettings(current => ({ ...current, stockAlerts: e.target.checked }))} className="h-4 w-4 accent-wine-600"/></label></div><div className="space-y-2 text-sm"><p><span className="text-slate-500">Store</span><br/>SK Silk &amp; Saree's</p><p><span className="text-slate-500">Email</span><br/>hello@sksilkandsarees.in</p></div></div>
          </section>

          <section id="admin" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-xl font-semibold">Admin account</h2><p className="mt-1 text-xs text-slate-500">Store access and account details</p><div className="mt-5 flex flex-wrap items-center justify-between gap-4"><div><p className="font-semibold">Store Admin</p><p className="mt-1 text-sm text-slate-500">admin@sksilkandsarees.in · Administrator</p></div><a href="/" className="inline-flex items-center gap-2 rounded-xl bg-wine-600 px-4 py-2.5 text-sm font-semibold text-white"><Users size={16}/> Sign out</a></div>
          </section>
        </div>
      </main>
    </div>
  );
}