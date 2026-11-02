"use client";

import { ChevronRight, Heart, Loader2, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { TextField } from "@/components/ui/TextField";
import { useAuth } from "@/store/auth";
import { useWishlistIds } from "@/store/wishlist";
import type { User } from "@/types/user";
import { RequireAuth } from "./RequireAuth";

const memberSince = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });

export function AccountView() {
  return <RequireAuth>{(user) => <Account user={user} />}</RequireAuth>;
}

function Account({ user }: { user: User }) {
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const likedCount = useWishlistIds().length;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container-page max-w-4xl pt-12 sm:pt-16">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">My Account</p>
      <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">สวัสดี, {user.name}</h1>
      <p className="mt-2 text-sm text-muted">สมาชิกตั้งแต่ {memberSince(user.createdAt)}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
        <nav className="flex flex-col divide-y divide-line border-y border-line text-sm">
          <AccountLink href="/wishlist" icon={<Heart className="size-4" strokeWidth={1.5} />}>
            สินค้าที่ถูกใจ <span className="text-muted">({likedCount})</span>
          </AccountLink>
          <div className="flex items-center gap-3 py-4 text-muted">
            <Package className="size-4" strokeWidth={1.5} />
            ประวัติคำสั่งซื้อ
            <span className="ml-auto bg-stone-100 px-2 py-0.5 text-[10px]">เร็ว ๆ นี้</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 py-4 text-left hover:opacity-60">
            <LogOut className="size-4" strokeWidth={1.5} />
            ออกจากระบบ
          </button>
        </nav>

        <ProfileForm user={user} />
      </div>
    </div>
  );
}

function AccountLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 py-4 hover:opacity-60">
      {icon}
      <span>{children}</span>
      <ChevronRight className="ml-auto size-4 text-muted" />
    </Link>
  );
}

function ProfileForm({ user }: { user: User }) {
  const updateProfile = useAuth((s) => s.updateProfile);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const dirty = name.trim() !== user.name || phone.trim() !== (user.phone ?? "");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("กรุณากรอกชื่อ");
      return;
    }
    if (phone.trim() && !/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, ""))) {
      setError("รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง");
      return;
    }
    setError("");
    setStatus("saving");
    await updateProfile({ name, phone });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <section>
      <h2 className="text-sm font-medium uppercase tracking-wide">ข้อมูลส่วนตัว</h2>
      <form onSubmit={submit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField className="sm:col-span-2" label="ชื่อ-นามสกุล" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="อีเมล" type="email" value={user.email} disabled hint="ไม่สามารถเปลี่ยนอีเมลได้" />
        <TextField label="เบอร์โทรศัพท์" type="tel" placeholder="08x-xxx-xxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}
        <div className="flex items-center gap-4 sm:col-span-2">
          <button type="submit" disabled={!dirty || status === "saving"} className="btn-primary">
            {status === "saving" && <Loader2 className="size-4 animate-spin" />}
            บันทึกการเปลี่ยนแปลง
          </button>
          {status === "saved" && <span className="text-sm text-muted">บันทึกแล้ว</span>}
        </div>
      </form>
    </section>
  );
}
