import { ReactNode } from "react";
import Card from "./Card";
import { useAuth } from "@/lib/auth-context";

interface SummaryStat {
  label: string;
  value: string;
}

interface DashboardShellProps {
  roleLabel: string;
  roleEmoji: string;
  roleColorClass: string;
  description: string;
  stats: SummaryStat[];
  children?: ReactNode;
}

/**
 * Reusable dashboard shell for Admin / Seller / Buyer / Driver.
 *
 * At Level 1 this is a placeholder: it shows the roles owned by the user,
 * the currently active role, and an entry point for balance/financial
 * summaries. Real wallet balance, Seller income, and Driver earnings are
 * wired up in later levels — for now the numbers shown in `stats` are
 * static placeholders so the shape of the dashboard is already in place.
 */
export default function DashboardShell({
  roleLabel,
  roleEmoji,
  roleColorClass,
  description,
  stats,
  children,
}: DashboardShellProps) {
  const { currentUser } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${roleColorClass}`}
          >
            {roleEmoji} Dashboard {roleLabel}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-stone-800">
            Halo, {currentUser?.username ?? "Pengguna"} 👋
          </h1>
          <p className="mt-1 max-w-xl text-sm text-stone-500">{description}</p>
        </div>

        {currentUser && currentUser.roles.length > 1 && (
          <Card className="p-4">
            <p className="text-xs font-medium text-stone-400">Role dimiliki</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {currentUser.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-stone-100 px-2 py-0.5 text-xs capitalize text-stone-600"
                >
                  {r}
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Balance / financial summary placeholder */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-xs font-medium text-stone-400">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-stone-800">{s.value}</p>
          </Card>
        ))}
      </div>

      {children && <div className="mt-8">{children}</div>}

      <Card className="mt-8 border-dashed bg-stone-50 p-6 text-center text-sm text-stone-400">
        Placeholder untuk fitur dashboard {roleLabel}.
      </Card>
    </div>
  );
}
