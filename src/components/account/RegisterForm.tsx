"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextField } from "@/components/ui/TextField";
import { AuthError } from "@/lib/auth-service";
import { safeNext, useAuth } from "@/store/auth";
import { useWishlistStore } from "@/store/wishlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

type Field = "name" | "email" | "password" | "confirm";

export function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const register = useAuth((s) => s.register);
  const flushPending = useWishlistStore((s) => s.flushPending);

  const [form, setForm] = useState<Record<Field, string>>({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field: Field) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const validate = () => {
    const errs: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) errs.name = "กรุณากรอกชื่อ";
    if (!EMAIL_RE.test(form.email.trim())) errs.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (form.password.length < MIN_PASSWORD) errs.password = `รหัสผ่านต้องมีอย่างน้อย ${MIN_PASSWORD} ตัวอักษร`;
    if (form.confirm !== form.password) errs.confirm = "รหัสผ่านไม่ตรงกัน";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register({ name: form.name, email: form.email, password: form.password });
      flushPending(user.id);
      router.replace(next);
    } catch (err) {
      if (err instanceof AuthError) setErrors({ email: err.message });
      else setFormError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField label="ชื่อ-นามสกุล" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
        <TextField label="อีเมล" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <TextField
          label="รหัสผ่าน"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          hint={`อย่างน้อย ${MIN_PASSWORD} ตัวอักษร`}
        />
        <TextField
          label="ยืนยันรหัสผ่าน"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
        />
        {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 className="size-4 animate-spin" />}
          สมัครสมาชิก
        </button>
        <p className="text-center text-xs leading-relaxed text-muted">
          การสมัครสมาชิกถือว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัวของ APSHOP
        </p>
      </form>
      <p className="mt-8 border-t border-line pt-8 text-center text-sm text-muted">
        เป็นสมาชิกอยู่แล้ว?{" "}
        <Link href={`/login${params.toString() ? `?${params}` : ""}`} className="text-ink underline underline-offset-4">
          เข้าสู่ระบบ
        </Link>
      </p>
    </>
  );
}
