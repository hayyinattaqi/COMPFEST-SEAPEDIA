"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardShell from "@/components/DashboardShell";

export default function BuyerDashboardPage() {
  return (
    <RoleGuard allowedRole="buyer">
      <DashboardShell
        roleLabel="Buyer"
        roleEmoji="🛒"
        roleColorClass="bg-brand-500 text-white"
        description="Kelola saldo wallet, alamat pengiriman, keranjang, dan riwayat pesanan."
        stats={[
          { label: "Saldo Wallet", value: "Rp0" },
          { label: "Item di Keranjang", value: "0" },
          { label: "Total Pesanan", value: "0" },
        ]}
      />
    </RoleGuard>
  );
}
