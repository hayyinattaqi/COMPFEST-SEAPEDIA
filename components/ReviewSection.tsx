"use client";

import { useState } from "react";
import { useReviews } from "@/lib/reviews-context";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import StarRating from "./StarRating";

export default function ReviewSection() {
  const { reviews, addReview } = useReviews();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const result = addReview({ reviewerName: name, rating, comment });
    if (!result.ok) {
      setError(result.error ?? "Gagal mengirim ulasan.");
      return;
    }
    setName("");
    setRating(5);
    setComment("");
    setSuccess(true);
  }

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold text-stone-800">Apa Kata Pengguna SEAPEDIA</h2>
      <p className="mt-1 text-sm text-stone-500">
        Ulasan ini tentang pengalaman menggunakan aplikasi SEAPEDIA — siapa saja
        boleh memberi ulasan tanpa perlu checkout atau bertransaksi.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Review list / "carousel" */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {reviews.length === 0 && (
            <p className="text-sm text-stone-400">Belum ada ulasan. Jadilah yang pertama!</p>
          )}
          {reviews.map((r) => (
            <Card key={r.id} className="min-w-[260px] max-w-[280px] flex-shrink-0 p-5">
              <StarRating rating={r.rating} />
              {/* Rendered as plain React text content, never raw HTML —
                  this is what keeps user-submitted comments from being
                  able to break layout or execute scripts. */}
              <p className="mt-3 text-sm text-stone-600">{r.comment}</p>
              <p className="mt-4 text-xs font-medium text-stone-400">
                — {r.reviewerName}
              </p>
            </Card>
          ))}
        </div>

        {/* Submission form */}
        <Card className="h-fit p-6">
          <h3 className="font-semibold text-stone-800">Tulis Ulasan Aplikasi</h3>
          <p className="mt-1 text-xs text-stone-400">
            Guest maupun pengguna terdaftar boleh mengisi form ini.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <Input
              label="Nama"
              placeholder="Nama kamu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-stone-700">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i)}
                    className={`text-2xl ${i <= rating ? "text-amber-400" : "text-stone-300"}`}
                    aria-label={`Beri rating ${i}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-stone-700">Komentar</label>
              <textarea
                className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                rows={3}
                placeholder="Ceritakan pengalamanmu memakai SEAPEDIA..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {success && (
              <p className="text-xs text-brand-600">Terima kasih, ulasan kamu sudah tampil!</p>
            )}
            <Button type="submit">Kirim Ulasan</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
