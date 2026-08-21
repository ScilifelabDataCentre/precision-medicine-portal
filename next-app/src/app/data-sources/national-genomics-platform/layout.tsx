import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "National Genomics Platform",
  description:
    "What Sweden's National Genomics Platform holds, who controls the data, and the approvals a research project needs before any data moves.",
  path: "/data-sources/national-genomics-platform",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
