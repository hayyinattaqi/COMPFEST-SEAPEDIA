"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardShell from "@/components/DashboardShell";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRole="admin">
      <DashboardShell
        roleLabel="Admin"
        roleEmoji="🛡️"
        roleColorClass="bg-stone-800 text-white"
        description="Pantau aktivitas marketplace, kelola sumber daya diskon, dan picu aksi operasional."
        stats={[
          { label: "Total Pengguna", value: "—" },
          { label: "Total Toko", value: "—" },
          { label: "Pesanan Aktif", value: "—" },
        ]}
      />
    </RoleGuard>
  );
}
