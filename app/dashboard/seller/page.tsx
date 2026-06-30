"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardShell from "@/components/DashboardShell";

export default function SellerDashboardPage() {
  return (
    <RoleGuard allowedRole="seller">
      <DashboardShell
        roleLabel="Seller"
        roleEmoji="🏪"
        roleColorClass="bg-accent-400 text-white"
        description="Buat dan kelola identitas toko, kelola produk, dan proses pesanan yang masuk."
        stats={[
          { label: "Nama Toko", value: "Belum dibuat" },
          { label: "Total Produk", value: "0" },
          { label: "Pendapatan Toko", value: "Rp0" },
        ]}
      />
    </RoleGuard>
  );
}
