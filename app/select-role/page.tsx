"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useAuth } from "@/lib/auth-context";
import { Role } from "@/lib/types";

const roleMeta: Record<Role, { label: string; emoji: string; description: string }> = {
  buyer: {
    label: "Buyer",
    emoji: "🛒",
    description: "Belanja, cek keranjang, dan pantau pesanan.",
  },
  seller: {
    label: "Seller",
    emoji: "🏪",
    description: "Kelola produk, toko, dan order masuk.",
  },
  driver: {
    label: "Driver",
    emoji: "🛵",
    description: "Terima tugas pengiriman dan pantau penghasilan.",
  },
  admin: {
    label: "Admin",
    emoji: "🛡️",
    description: "Pantau operasi marketplace dan kebijakan.",
  },
};

export default function SelectRolePage() {
  const { currentUser, activeRole, isHydrated, chooseActiveRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (activeRole && currentUser.roles.includes(activeRole)) {
      router.replace(`/dashboard/${activeRole}`);
      return;
    }

    if (currentUser.roles.length === 1) {
      const singleRole = currentUser.roles[0];
      chooseActiveRole(singleRole);
      router.replace(`/dashboard/${singleRole}`);
    }
  }, [activeRole, chooseActiveRole, currentUser, isHydrated, router]);

  if (!isHydrated || !currentUser) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-stone-400">
        Memuat pilihan role...
      </div>
    );
  }

  if (currentUser.roles.length === 1) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-stone-400">
        Mengarahkan ke dashboard...
      </div>
    );
  }

  function handleChoose(role: Role) {
    chooseActiveRole(role);
    router.push(`/dashboard/${role}`);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          Pilih peran aktif
        </p>
        <h1 className="mt-2 text-3xl font-bold text-stone-800">
          Halo, {currentUser.username}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Akun ini punya beberapa role. Pilih role yang ingin dipakai hari ini agar
          dashboard bisa dibuka.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {currentUser.roles.map((role) => (
          <Card key={role} className="p-6">
            <div className="text-4xl">{roleMeta[role].emoji}</div>
            <h2 className="mt-4 text-xl font-semibold text-stone-800">
              {roleMeta[role].label}
            </h2>
            <p className="mt-2 text-sm text-stone-500">{roleMeta[role].description}</p>
            <Button className="mt-5" fullWidth onClick={() => handleChoose(role)}>
              Masuk sebagai {roleMeta[role].label}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
