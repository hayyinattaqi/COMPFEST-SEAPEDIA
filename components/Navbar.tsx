"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Button from "./Button";

const roleLabel: Record<string, string> = {
  admin: "Admin",
  seller: "Seller",
  buyer: "Buyer",
  driver: "Driver",
};

const roleColor: Record<string, string> = {
  admin: "bg-stone-800 text-white",
  seller: "bg-accent-400 text-white",
  buyer: "bg-brand-500 text-white",
  driver: "bg-sky-600 text-white",
};

export default function Navbar() {
  const { currentUser, activeRole, logout, isHydrated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = isHydrated && !!currentUser;

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <span className="text-lg font-bold text-brand-700">SEAPEDIA</span>
          <span className="hidden text-xs text-stone-400 sm:inline">
            marketplace multi-role
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm text-stone-600 hover:text-brand-600">
            Katalog
          </Link>
          <Link href="/#reviews" className="text-sm text-stone-600 hover:text-brand-600">
            Ulasan
          </Link>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Daftar
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {activeRole ? (
                <Link
                  href={`/dashboard/${activeRole}`}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor[activeRole]}`}
                >
                  {roleLabel[activeRole]} • {currentUser?.username}
                </Link>
              ) : (
                <Link
                  href="/select-role"
                  className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                >
                  Pilih role aktif
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Keluar
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded-md border border-stone-300 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Buka menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-stone-200 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm">
              Katalog
            </Link>
            <Link href="/#reviews" onClick={() => setMenuOpen(false)} className="text-sm">
              Ulasan
            </Link>
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link href="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" size="sm" fullWidth>
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Daftar
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {activeRole ? (
                  <Link
                    href={`/dashboard/${activeRole}`}
                    onClick={() => setMenuOpen(false)}
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${roleColor[activeRole]}`}
                  >
                    {roleLabel[activeRole]} • {currentUser?.username}
                  </Link>
                ) : (
                  <Link
                    href="/select-role"
                    onClick={() => setMenuOpen(false)}
                    className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                  >
                    Pilih role aktif
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
