import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import BrandLogo from "../components/BrandLogo";

export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Password must contain at least 6 characters.";
    setErrors(next);
    if (!Object.keys(next).length) navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-silk-50 dark:bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-2">
        <div className="hidden overflow-hidden rounded-[2rem] bg-wine-700 p-10 text-white md:block">
          <div className="pattern rounded-[1.5rem] border border-white/10 p-10">
            <Sparkles size={28}/>
            <h1 className="mt-8 font-display text-5xl leading-tight">Welcome back to SK Silk &amp; Saree's.</h1>
            <p className="mt-5 leading-7 text-white/75">Manage your boutique collection, orders and customer experience from one beautiful dashboard.</p>
            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
              <img src="https://geographicalindicationsoftamilnadu.wordpress.com/wp-content/uploads/2021/04/0_t6uqebqbykgix6sk.jpg?w=869" className="aspect-[4/3] w-full object-cover" alt="Silk saree"/>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex justify-between"><BrandLogo/><ThemeToggle/></div>
          <div className="rounded-3xl border border-silk-100 bg-white p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <h2 className="font-display text-3xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-slate-500">Use the demo account to explore the dashboard.</p>
            <form onSubmit={submit} className="mt-7 space-y-5">
              <div><label className="mb-2 block text-sm font-semibold">Email</label><div className="relative"><Mail className="absolute left-3 top-3.5 text-slate-400" size={18}/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 outline-none focus:border-wine-500 focus:ring-2 focus:ring-wine-100 dark:border-slate-700 dark:bg-slate-950" placeholder="admin@sksilkandsarees.in"/></div>{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}</div>
              <div><label className="mb-2 block text-sm font-semibold">Password</label><div className="relative"><LockKeyhole className="absolute left-3 top-3.5 text-slate-400" size={18}/><input type={show?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 outline-none focus:border-wine-500 focus:ring-2 focus:ring-wine-100 dark:border-slate-700 dark:bg-slate-950" placeholder="••••••••"/><button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-3.5 text-slate-400">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>{errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}</div>
              <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2"><input type="checkbox" className="accent-wine-600"/> Remember me</label><button type="button" className="font-semibold text-wine-600">Forgot password?</button></div>
              <button className="w-full rounded-xl bg-wine-600 py-3 font-bold text-white transition hover:bg-wine-700 hover:shadow-lg">Sign in</button>
            </form>
            <p className="mt-6 text-center text-xs text-slate-500">Demo: any valid email + password with 6+ characters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}