import type { Metadata } from "next";

export const metadata: Metadata = { title: "Other Data Sources" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
