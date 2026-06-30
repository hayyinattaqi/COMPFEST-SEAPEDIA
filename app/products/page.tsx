import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/Card";
import { dummyProducts } from "@/lib/dummy-products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = dummyProducts.find((p) => p.id === id);
  if (!product) notFound();

  const otherFromStore = dummyProducts.filter(
    (p) => p.storeId === product.storeId && p.id !== product.id
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/products" className="text-sm text-brand-600 hover:underline">
        ← Kembali ke katalog
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Card className="flex items-center justify-center p-10">
          <span className="text-9xl">{product.image}</span>
        </Card>

        <div>
          <h1 className="text-2xl font-bold text-stone-800">{product.name}</h1>
          <Link
            href={`/products?store=${product.storeId}`}
            className="mt-1 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            🏪 {product.storeName}
          </Link>

          <p className="mt-4 text-3xl font-extrabold text-brand-700">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
          <p className="mt-1 text-sm text-stone-400">Stok tersedia: {product.stock}</p>

          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {product.description}
          </p>

          <Card className="mt-6 bg-stone-50 p-4">
            <p className="text-sm text-stone-500">
              🔒 Checkout dan keranjang belanja hanya tersedia untuk Buyer yang
              sudah login. Daftar atau masuk untuk mulai berbelanja.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/login"
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Masuk untuk Beli
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {otherFromStore.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-stone-800">
            Produk lain dari {product.storeName}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {otherFromStore.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <Card className="p-4 transition hover:shadow-md">
                  <div className="flex h-24 items-center justify-center rounded-xl bg-brand-50 text-5xl">
                    {p.image}
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-stone-800">
                    {p.name}
                  </p>
                  <p className="text-sm font-bold text-brand-700">
                    Rp{p.price.toLocaleString("id-ID")}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
