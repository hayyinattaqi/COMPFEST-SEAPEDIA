"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Role } from "@/lib/types";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

const selectableRoles: { role: Role; label: string; desc: string }[] = [
  { role: "buyer", label: "Buyer", desc: "Belanja produk dari berbagai toko" },
  { role: "seller", label: "Seller", desc: "Buka toko dan jual produk" },
  { role: "driver", label: "Driver", desc: "Ambil job pengiriman" },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<Role[]>(["buyer"]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function toggleRole(role: Role) {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = register({ username, email, password, roles });
    if (!result.ok) {
      setError(result.error ?? "Pendaftaran gagal.");
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/login"), 1200);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-stone-800">Daftar Akun SEAPEDIA</h1>
      <p className="mt-1 text-sm text-stone-500">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Masuk di sini
        </Link>
      </p>

      <Card className="mt-6 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <div>
            <p className="text-sm font-medium text-stone-700">
              Pilih role (boleh lebih dari satu)
            </p>
            <p className="text-xs text-stone-400">
              Satu username non-admin boleh memiliki beberapa role sekaligus.
              Kamu akan memilih role aktif setiap kali login.
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {selectableRoles.map((r) => (
                <label
                  key={r.role}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 px-3 py-2 hover:bg-stone-50"
                >
                  <input
                    type="checkbox"
                    checked={roles.includes(r.role)}
                    onChange={() => toggleRole(r.role)}
                    className="h-4 w-4 accent-brand-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-stone-700">{r.label}</p>
                    <p className="text-xs text-stone-400">{r.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}
          {success && (
            <p className="text-xs text-brand-600">
              Pendaftaran berhasil! Mengarahkan ke halaman login...
            </p>
          )}
          <Button type="submit" fullWidth>
            Daftar
          </Button>
        </form>
      </Card>
    </div>
  );
}
