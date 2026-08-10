"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "AI Sales Agent", href: "#ai-sales-agent" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "AI Radar", href: "#ai-radar" },
  { name: "Pricing", href: "#pricing" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">

      {/* Desktop Navbar */}
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-6">

        {/* Logo */}
        <div className="justify-self-start">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            AIFlow
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-2 md:flex lg:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center justify-self-end gap-2 md:flex">

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>

          {/* Login */}
          <Link
            href="/login"
            className="px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>

          {/* Get Started */}
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="col-start-3 flex items-center justify-self-end gap-1 md:hidden">

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-border bg-background md:hidden"
          >
            <div className="px-6 py-5">

              {/* Mobile Links */}
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.2,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block border-b border-border py-4 text-base font-medium text-foreground"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-5 flex flex-col gap-3">

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Login
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Get Started
                </Link>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}