import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { careItems } from "../data/customerCare";
import BrandLogo from "../components/BrandLogo";

export default function CustomerCare() {
  const { slug } = useParams();
  const page = careItems.find(item => item.slug === slug);

  return (
    <div className="min-h-screen bg-silk-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-silk-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <BrandLogo imageClassName="h-11 w-11"/>
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link to="/cart" className="hover:text-wine-600">Shopping bag</Link>
            <Link to="/track" className="hover:text-wine-600">Track order</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-wine-600"><ArrowLeft size={16}/> Back to shopping</Link>
        {page ? <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="rounded-2xl border border-silk-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-widest text-wine-600">Customer Care</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">{page.title}</h1>
            {page.detail && <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{page.detail}</p>}
            {page.faqs && <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">{page.faqs.map(([question, answer]) => <section key={question} className="py-5 first:pt-0 last:pb-0"><h2 className="font-semibold">{question}</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{answer}</p></section>)}</div>}
            <div className="mt-8 border-t border-slate-100 pt-5 text-sm dark:border-slate-800"><p className="font-semibold">Need more help?</p><a href="mailto:hello@sksilkandsarees.in" className="mt-2 inline-flex items-center gap-1 text-wine-600 hover:text-wine-700">hello@sksilkandsarees.in <ArrowUpRight size={14}/></a></div>
          </article>
          <aside className="rounded-2xl border border-silk-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-display text-lg font-semibold">More customer care</h2><nav className="mt-3 space-y-1">{careItems.map(item => <Link key={item.slug} to={`/care/${item.slug}`} aria-current={item.slug === page.slug ? "page" : undefined} className={`block rounded-lg px-3 py-2.5 text-sm transition hover:bg-silk-50 dark:hover:bg-slate-800 ${item.slug === page.slug ? "bg-silk-50 font-semibold text-wine-700 dark:bg-slate-800 dark:text-wine-300" : "text-slate-600 dark:text-slate-300"}`}>{item.title}</Link>)}</nav></aside>
        </div> : <div className="mt-8 rounded-2xl border border-silk-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"><h1 className="font-display text-2xl font-semibold">Page not found</h1><p className="mt-2 text-sm text-slate-500">Choose a Customer Care topic or return to the shop.</p><Link to="/" className="mt-5 inline-flex rounded-xl bg-wine-600 px-4 py-2.5 text-sm font-semibold text-white">Return to shop</Link></div>}
      </main>
    </div>
  );
}
