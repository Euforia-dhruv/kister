"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const HIDE_ON_PATHS = ["/"];

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldHide = HIDE_ON_PATHS.includes(pathname);

  if (shouldHide) return null;
  return <>{children}</>;
}
