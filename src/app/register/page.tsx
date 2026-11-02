import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/account/AuthLayout";
import { RegisterForm } from "@/components/account/RegisterForm";

export const metadata: Metadata = { title: "สมัครสมาชิก" };

export default function RegisterPage() {
  return (
    <AuthLayout eyebrow="Join APSHOP" title="สมัครสมาชิก">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
