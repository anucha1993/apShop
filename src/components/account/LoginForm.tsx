"use client";

import { Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { TextField } from "@/components/ui/TextField";
import { AuthError } from "@/lib/auth-service";
import { safeNext, useAuth, useAuthReady } from "@/store/auth";
import { useWishlistStore } from "@/store/wishlist";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const fromWishlist = params.get("reason") === "wishlist";

  const ready = useAuthReady();
  const user = useAuth((s) => s.user);
  const login = useAuth((s) => s.login);
  const flushPending = useWishlistStore((s) => s.flushPending);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already signed in: skip the form.
  useEffect(() => {
    if (ready && user && !loading) router.replace(next);
  }, [ready, user, loading, next, router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const u = await login(email, password);
      flushPending(u.id);
      router.replace(next);
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
      setLoading(false);
    }
  };

  const registerHref = `/register${params.toString() ? `?${params}` : ""}`;

  return (
    <>
      {fromWishlist && (
        <p className="mb-6 flex items-start gap-3 bg-stone-100 px-4 py-3 text-sm">
          <Heart className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          เข้าสู่ระบบเพื่อบันทึกสินค้าที่ถูกใจ เราจะเพิ่มสินค้าชิ้นนั้นให้อัตโนมัติ
        </p>
      )}
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField
          label="อีเมล"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="รหัสผ่าน"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 className="size-4 animate-spin" />}
          เข้าสู่ระบบ
        </button>
      </form>
      <div className="mt-10 border-t border-line pt-8 text-center">
        <p className="text-sm text-muted">ยังไม่เป็นสมาชิก?</p>
        <Link href={registerHref} className="btn-secondary mt-4 w-full">
          สมัครสมาชิก
        </Link>
      </div>
    </>
  );
}
