import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Inquire" },
];

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-linen/5">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-display text-lg font-[100] tracking-[0.2em] text-linen">
              KITSER
            </span>
            <p className="mt-4 font-body text-sm font-[300] leading-relaxed text-smoke">
              Premium kitchen curation.<br />
              Heritage meets innovation.<br />
              Coimbatore, India.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors hover:text-linen"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-sm font-[300] text-smoke">
              No. 1, Nava India Road
            </span>
            <span className="font-body text-sm font-[300] text-smoke">
              Coimbatore — 641028
            </span>
            <span className="mt-2 font-body text-sm font-[300] text-ember">
              +91 422 230 1092
            </span>
          </div>
        </div>

        <div className="mt-16 border-t border-linen/5 pt-8">
          <p className="font-body text-xs font-[300] text-ash">
            &copy; {new Date().getFullYear()} Kitser Retail Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
