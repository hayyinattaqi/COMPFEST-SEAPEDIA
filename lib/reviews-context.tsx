"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AppReview } from "./types";

const REVIEWS_KEY = "seapedia_app_reviews";

interface ReviewsContextValue {
  reviews: AppReview[];
  addReview: (input: {
    reviewerName: string;
    rating: number;
    comment: string;
  }) => { ok: boolean; error?: string };
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

const seedReviews: AppReview[] = [
  {
    id: "r1",
    reviewerName: "Dewi A.",
    rating: 5,
    comment:
      "Tampilannya enak dipakai dan gampang nemu produk lokal Jogja di sini!",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "r2",
    reviewerName: "Bagas P.",
    rating: 4,
    comment: "Konsep multi-seller-nya menarik, semoga fitur checkout-nya lancar.",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

function loadReviews(): AppReview[] {
  if (typeof window === "undefined") return seedReviews;
  try {
    const raw = window.localStorage.getItem(REVIEWS_KEY);
    if (raw) return JSON.parse(raw) as AppReview[];
    window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(seedReviews));
    return seedReviews;
  } catch {
    return seedReviews;
  }
}

function saveReviews(reviews: AppReview[]) {
  window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<AppReview[]>([]);

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  function addReview(input: {
    reviewerName: string;
    rating: number;
    comment: string;
  }) {
    const name = input.reviewerName.trim();
    const comment = input.comment.trim();
    if (!name || !comment) {
      return { ok: false, error: "Nama dan komentar wajib diisi." };
    }
    if (input.rating < 1 || input.rating > 5) {
      return { ok: false, error: "Rating harus antara 1 sampai 5." };
    }
    const newReview: AppReview = {
      id: `r_${Date.now()}`,
      reviewerName: name,
      rating: input.rating,
      // Stored as plain text. Rendering as plain text (never via
      // dangerouslySetInnerHTML) is what keeps this XSS-safe — formal
      // sanitization/escaping is hardened further in Level 7.
      comment,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);
    return { ok: true };
  }

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}
