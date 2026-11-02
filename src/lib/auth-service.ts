import type { ProfileUpdate, RegisterInput, User } from "@/types/user";

/**
 * Mock auth "API" backed by localStorage.
 * Phase 2: replace the bodies of these functions with fetch() calls to the real backend —
 * the signatures and thrown AuthError messages are what the UI depends on.
 */

const USERS_KEY = "apshop-users";
const LATENCY_MS = 400;

interface StoredUser extends User {
  passwordHash: string;
}

export class AuthError extends Error {}

const wait = () => new Promise((r) => setTimeout(r, LATENCY_MS));

const readUsers = (): Record<string, StoredUser> => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
};

const writeUsers = (users: Record<string, StoredUser>) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** SHA-256 of email+password so plain-text passwords never hit storage. Not a substitute for server-side bcrypt/argon2. */
async function hashPassword(email: string, password: string) {
  const data = new TextEncoder().encode(`${email}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

const toPublic = ({ passwordHash: _, ...user }: StoredUser): User => user;

export async function registerUser(input: RegisterInput): Promise<User> {
  await wait();
  const email = normalizeEmail(input.email);
  const users = readUsers();
  if (users[email]) throw new AuthError("อีเมลนี้ถูกใช้สมัครสมาชิกแล้ว");

  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email,
    createdAt: new Date().toISOString(),
    passwordHash: await hashPassword(email, input.password),
  };
  writeUsers({ ...users, [email]: user });
  return toPublic(user);
}

export async function loginUser(rawEmail: string, password: string): Promise<User> {
  await wait();
  const email = normalizeEmail(rawEmail);
  const user = readUsers()[email];
  if (!user || user.passwordHash !== (await hashPassword(email, password))) {
    throw new AuthError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }
  return toPublic(user);
}

export async function updateUser(email: string, patch: ProfileUpdate): Promise<User> {
  await wait();
  const users = readUsers();
  const user = users[email];
  if (!user) throw new AuthError("ไม่พบบัญชีผู้ใช้");
  const updated = { ...user, name: patch.name.trim(), phone: patch.phone?.trim() || undefined };
  writeUsers({ ...users, [email]: updated });
  return toPublic(updated);
}
