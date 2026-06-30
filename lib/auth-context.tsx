"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Role, User } from "./types";
import { demoHash } from "./hash";

const USERS_KEY = "seapedia_users";
const SESSION_KEY = "seapedia_session";

interface SessionShape {
  userId: string | null;
  activeRole: Role | null;
}

interface AuthContextValue {
  currentUser: User | null;
  activeRole: Role | null;
  isHydrated: boolean;
  register: (input: {
    username: string;
    email: string;
    password: string;
    roles: Role[];
  }) => { ok: boolean; error?: string };
  login: (input: {
    usernameOrEmail: string;
    password: string;
  }) => { ok: boolean; error?: string; needsRoleSelection?: boolean };
  logout: () => void;
  chooseActiveRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : seedUsers();
  } catch {
    return seedUsers();
  }
}

function saveUsers(users: User[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Seed demo accounts so the multi-role flow can be tested immediately.
function seedUsers(): User[] {
  const seeded: User[] = [
    {
      id: "u_admin",
      username: "admin",
      email: "admin@seapedia.test",
      passwordHash: demoHash("admin123"),
      roles: ["admin"],
    },
    {
      id: "u_multirole",
      username: "hayyin",
      email: "hayyin@seapedia.test",
      passwordHash: demoHash("password123"),
      roles: ["buyer", "seller", "driver"],
    },
    {
      id: "u_buyer",
      username: "buyer_demo",
      email: "buyer@seapedia.test",
      passwordHash: demoHash("password123"),
      roles: ["buyer"],
    },
  ];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  }
  return seeded;
}

function loadSession(): SessionShape {
  if (typeof window === "undefined") return { userId: null, activeRole: null };
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw
      ? (JSON.parse(raw) as SessionShape)
      : { userId: null, activeRole: null };
  } catch {
    return { userId: null, activeRole: null };
  }
}

function saveSession(session: SessionShape) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [session, setSession] = useState<SessionShape>({
    userId: null,
    activeRole: null,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setUsers(loadUsers());
    setSession(loadSession());
    setIsHydrated(true);
  }, []);

  const currentUser = useMemo(
    () => users.find((u) => u.id === session.userId) ?? null,
    [users, session.userId]
  );

  function register(input: {
    username: string;
    email: string;
    password: string;
    roles: Role[];
  }): { ok: boolean; error?: string } {
    const exists = users.some(
      (u) =>
        u.username.toLowerCase() === input.username.toLowerCase() ||
        u.email.toLowerCase() === input.email.toLowerCase()
    );
    if (exists) {
      return { ok: false, error: "Username atau email sudah terdaftar." };
    }
    if (input.roles.length === 0) {
      return { ok: false, error: "Pilih minimal satu role (Buyer/Seller/Driver)." };
    }
    const newUser: User = {
      id: `u_${Date.now()}`,
      username: input.username,
      email: input.email,
      passwordHash: demoHash(input.password),
      roles: input.roles,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    return { ok: true };
  }

  function login(input: { usernameOrEmail: string; password: string }) {
    const all = loadUsers();
    const found = all.find(
      (u) =>
        u.username.toLowerCase() === input.usernameOrEmail.toLowerCase() ||
        u.email.toLowerCase() === input.usernameOrEmail.toLowerCase()
    );
    if (!found || found.passwordHash !== demoHash(input.password)) {
      return { ok: false, error: "Username/email atau password salah." };
    }
    setUsers(all);

    // Admin has a single implicit role; non-admin with >1 role must choose.
    if (found.roles.length === 1) {
      const newSession: SessionShape = {
        userId: found.id,
        activeRole: found.roles[0],
      };
      setSession(newSession);
      saveSession(newSession);
      return { ok: true, needsRoleSelection: false };
    }

    const newSession: SessionShape = { userId: found.id, activeRole: null };
    setSession(newSession);
    saveSession(newSession);
    return { ok: true, needsRoleSelection: true };
  }

  function logout() {
    const cleared: SessionShape = { userId: null, activeRole: null };
    setSession(cleared);
    saveSession(cleared);
  }

  function chooseActiveRole(role: Role) {
    if (!currentUser) return;
    if (!currentUser.roles.includes(role)) return;
    const next: SessionShape = { userId: currentUser.id, activeRole: role };
    setSession(next);
    saveSession(next);
  }

  const value: AuthContextValue = {
    currentUser,
    activeRole: session.activeRole,
    isHydrated,
    register,
    login,
    logout,
    chooseActiveRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
