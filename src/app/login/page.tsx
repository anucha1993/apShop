import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/account/AuthLayout";
import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = { title: "เข้าสู่ระบบ" };

export default function LoginPage() {
  return (
    <AuthLayout eyebrow="Sign In" title="เข้าสู่ระบบ">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
