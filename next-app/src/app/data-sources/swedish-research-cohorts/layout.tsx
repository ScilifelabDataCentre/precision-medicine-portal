import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Swedish research cohorts",
  description:
    "Search Swedish research cohorts and biobank-based studies for precision medicine research.",
  path: "/data-sources/swedish-research-cohorts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
