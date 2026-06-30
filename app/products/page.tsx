"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { dummyProducts } from "@/lib/dummy-products";

/**
 * Public product catalog.
 *
 * Level 1 business rules implemented here:
 * - Guests (no login required) may browse the full catalog and search/filter it.
 * - Only read/browse actions are exposed — no "Add to cart", "Edit", or
 *   "Delete" controls live on this page, since checkout and product
 *   management are private dashboard actions (Buyer / Seller only).
 * - Data is currently dummy/static (see lib/dummy-products.ts) until the
 *   product backend is integrated in Level 2.
 */
export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState<string>("all");

  const stores = useMemo(() => {
    const unique = new Map<string, string>();
    dummyProducts.forEach((p) => unique.set(p.storeId, p.storeName));
    return Array.from(unique, ([storeId, storeName]) => ({ storeId, storeName }));
  }, []);

  const filtered = useMemo(() => {
    return dummyProducts.filter((p) => {
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.storeName.toLowerCase().includes(query.toLowerCase());
      const matchesStore = storeFilter === "all" || p.storeId === storeFilter;
      return matchesQuery && matchesStore;
    });
  }, [query, storeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Katalog Publik
        </span>
        <h1 className="text-2xl font-bold text-stone-800">
          Jelajahi Produk dari Berbagai Toko
        </h1>
        <p className="text-sm text-stone-500">
          SEAPEDIA adalah marketplace, bukan satu toko tunggal — produk di
          bawah ini berasal dari beberapa Seller berbeda. Siapa saja boleh
          melihat katalog dan detail produk tanpa perlu login.
        </p>
      </div>

      {/* Search & filter */}
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px]">
        <Input
          placeholder="Cari produk atau nama toko..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={storeFilter}
          onChange={(e) => setStoreFilter(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          <option value="all">Semua Toko</option>
          {stores.map((s) => (
            <option key={s.storeId} value={s.storeId}>
              {s.storeName}
            </option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-stone-400">
          Tidak ada produk yang cocok dengan pencarianmu.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <Card className="h-full p-4 transition hover:shadow-md">
                <div className="flex h-32 items-center justify-center rounded-xl bg-brand-50 text-6xl">
                  {p.image}
                </div>
                <p className="mt-3 line-clamp-1 text-sm font-semibold text-stone-800">
                  {p.name}
                </p>
                <p className="text-xs text-stone-400">🏪 {p.storeName}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-brand-700">
                    Rp{p.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-stone-400">Stok {p.stock}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Card className="mt-12 bg-stone-50 p-4 text-center">
        <p className="text-sm text-stone-500">
          🔒 Ingin checkout produk ini? Login sebagai Buyer untuk mulai
          berbelanja.
        </p>
        <div className="mt-3 flex justify-center gap-2">
          <Link
            href="/login"
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            Daftar
          </Link>
        </div>
      </Card>
    </div>
  );
}
