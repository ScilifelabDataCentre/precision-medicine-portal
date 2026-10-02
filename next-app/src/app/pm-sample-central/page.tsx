import type { ReactElement } from "react";

import {
  LEAD,
  PMSC_PATH,
  PMSC_TITLE,
} from "@/components/pm-sample-central/content";
import { PmscPage } from "@/components/pm-sample-central/pmsc-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: PMSC_TITLE,
  description: LEAD,
  path: PMSC_PATH,
});

export default function PmSampleCentralPage(): ReactElement {
  return <PmscPage />;
}
