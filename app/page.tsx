import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ReviewSection from "@/components/ReviewSection";
import { dummyProducts } from "@/lib/dummy-products";

const roleCards = [
  {
    role: "Buyer",
    emoji: "🛒",
    desc: "Belanja dari berbagai toko, bayar pakai wallet, dan lacak pesananmu.",
  },
  {
    role: "Seller",
    emoji: "🏪",
    desc: "Buka toko, kelola produk, dan proses pesanan yang masuk.",
  },
  {
    role: "Driver",
    emoji: "🛵",
    desc: "Temukan job pengiriman, antar pesanan, dan pantau penghasilanmu.",
  },
  {
    role: "Admin",
    emoji: "🛡️",
    desc: "Pantau seluruh aktivitas marketplace dan kelola promo/voucher.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-stone-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center">
          <span className="rounded-full bg-brand-100 px-4 py-1 text-xs font-semibold text-brand-700">
            Marketplace Multi-Role
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-stone-800 sm:text-5xl">
            Belanja, Berjualan, dan Mengirim — Semua dalam Satu{" "}
            <span className="text-brand-600">SEAPEDIA</span>
          </h1>
          <p className="max-w-xl text-stone-500">
            SEAPEDIA menghubungkan banyak toko, pembeli, dan kurir dalam satu
            ekosistem marketplace. Satu akun, banyak peran — Buyer, Seller,
            atau Driver, kamu yang pilih.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products">
              <Button size="lg">Jelajahi Katalog</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="ghost">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Role explainer */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-800">
          Satu Marketplace, Banyak Peran
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Tidak seperti toko online biasa, SEAPEDIA adalah marketplace
          multi-seller dengan 4 jenis peran pengguna.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleCards.map((r) => (
            <Card key={r.role} className="p-6">
              <div className="text-3xl">{r.emoji}</div>
              <h3 className="mt-3 font-semibold text-stone-800">{r.role}</h3>
              <p className="mt-1 text-sm text-stone-500">{r.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured products (dummy/public) */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-800">Produk Pilihan</h2>
          <Link href="/products" className="text-sm font-medium text-brand-600 hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dummyProducts.slice(0, 4).map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <Card className="h-full p-4 transition hover:shadow-md">
                <div className="flex h-28 items-center justify-center rounded-xl bg-brand-50 text-5xl">
                  {p.image}
                </div>
                <p className="mt-3 line-clamp-1 text-sm font-semibold text-stone-800">
                  {p.name}
                </p>
                <p className="text-xs text-stone-400">{p.storeName}</p>
                <p className="mt-1 text-sm font-bold text-brand-700">
                  Rp{p.price.toLocaleString("id-ID")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <ReviewSection />
    </div>
  );
}
