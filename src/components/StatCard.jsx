export default function StatCard({ label, value, change, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-silk-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</p></div>
        <div className="rounded-xl bg-wine-50 p-3 text-wine-600 dark:bg-wine-700/20"><Icon size={20}/></div>
      </div>
      <p className="mt-3 text-xs font-semibold text-emerald-600">{change}</p>
    </div>
  );
}