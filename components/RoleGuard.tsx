"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Role } from "@/lib/types";

/**
 * Protects a page so only a logged-in user whose ACTIVE role matches
 * `allowedRole` can view it. This is a frontend convenience guard only —
 * once a real backend exists, the same check must be enforced server-side
 * (this is required explicitly in Level 7, "the backend must not trust
 * role information only because it appears in the UI").
 */
export default function RoleGuard({
  allowedRole,
  children,
}: {
  allowedRole: Role;
  children: ReactNode;
}) {
  const { currentUser, activeRole, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    if (!activeRole) {
      router.replace("/select-role");
      return;
    }
    if (activeRole !== allowedRole) {
      router.replace(`/dashboard/${activeRole}`);
    }
  }, [isHydrated, currentUser, activeRole, allowedRole, router]);

  if (!isHydrated || !currentUser || activeRole !== allowedRole) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-stone-400">
        Memeriksa akses...
      </div>
    );
  }

  return <>{children}</>;
}
