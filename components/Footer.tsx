export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-brand-700">
            🌊 SEAPEDIA
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Marketplace yang menghubungkan Seller, Buyer, dan Driver dalam satu
            ekosistem belanja online.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Jelajahi</p>
          <ul className="mt-2 space-y-1 text-sm text-stone-500">
            <li>Katalog Produk</li>
            <li>Ulasan Aplikasi</li>
            <li>Gabung Jadi Seller</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Status Project</p>
          <p className="mt-2 text-sm text-stone-500">
            Level 1 — Public Marketplace, Authentication &amp; Reviews.
          </p>
        </div>
      </div>
      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} SEAPEDIA. Dibuat untuk COMPFEST 18 Technical
        Challenge.
      </div>
    </footer>
  );
}
