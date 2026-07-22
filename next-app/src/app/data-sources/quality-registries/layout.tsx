import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Quality registries",
  description:
    "Search Swedish national quality registries that offer individual-level health data for precision medicine research.",
  path: "/data-sources/quality-registries",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
