import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ReviewsProvider } from "@/lib/reviews-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SEAPEDIA — Marketplace Multi-Role",
  description:
    "SEAPEDIA menghubungkan Seller, Buyer, dan Driver dalam satu ekosistem marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <ReviewsProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ReviewsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
