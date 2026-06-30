"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = login({ usernameOrEmail, password });
    if (!result.ok) {
      setError(result.error ?? "Login gagal.");
      return;
    }
    if (result.needsRoleSelection) {
      router.push("/select-role");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-stone-800">Masuk ke SEAPEDIA</h1>
      <p className="mt-1 text-sm text-stone-500">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          Daftar di sini
        </Link>
      </p>

      <Card className="mt-6 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username atau Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit" fullWidth>
            Masuk
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-stone-50 p-3 text-xs text-stone-500">
          <p className="font-semibold">Akun demo:</p>
          <p>admin / admin123 (Admin)</p>
          <p>hayyin / password123 (Buyer + Seller + Driver — multi-role)</p>
          <p>buyer_demo / password123 (Buyer)</p>
        </div>
      </Card>
    </div>
  );
}
