"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardShell from "@/components/DashboardShell";

export default function DriverDashboardPage() {
  return (
    <RoleGuard allowedRole="driver">
      <DashboardShell
        roleLabel="Driver"
        roleEmoji="🛵"
        roleColorClass="bg-sky-600 text-white"
        description="Temukan job pengiriman, ambil job, dan konfirmasi pesanan selesai. Find job, take job, dan earnings penuh hadir di Level 5."
        stats={[
          { label: "Job Aktif", value: "Tidak ada" },
          { label: "Job Selesai", value: "0" },
          { label: "Total Penghasilan", value: "Rp0" },
        ]}
      />
    </RoleGuard>
  );
}
