import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "AI Sales Agent", href: "#ai-sales-agent" },
  ],
  Resources: [
    { name: "AI Radar", href: "#ai-radar" },
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              AIFlow
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              AI-powered sales automation that helps your team understand,
              engage, qualify, and convert more leads.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                GH
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                in
              </Link>

              <Link
                href="#"
                aria-label="X / Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                𝕏
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-foreground">
                  {category}
                </h3>

                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}

                        {(link.name === "Documentation" ||
                          link.name === "Help Center") && (
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AIFlow. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built for teams that want to sell smarter.
          </p>
        </div>
      </div>
    </footer>
  );
}