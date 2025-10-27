"use client";
import { useEffect } from "react";
import { useRouter } from "../../../src/i18n/navigation";
import { useUser } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <>{children}</>;
}
