import { Link } from "react-router-dom";

export default function BrandLogo({ className = "", imageClassName = "h-11 w-11", subtitle, showName = true }) {
  return (
    <Link to="/" aria-label="SK Silk & Saree's home" className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      <img src="/images/SK%20Silk%20&%20Saree.png" alt="SK Silk & Saree's logo" className={`${imageClassName} shrink-0 rounded-full object-cover`}/>
      {showName && <span className="min-w-0"><span className="block truncate font-display font-bold">SK Silk &amp; Saree's</span>{subtitle && <span className="block text-[10px] font-semibold uppercase tracking-[.25em] text-wine-600">{subtitle}</span>}</span>}
    </Link>
  );
}
