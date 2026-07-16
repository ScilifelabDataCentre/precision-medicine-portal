"use client";

import { ReactElement } from "react";

export default function KiarvaIFramePage(): ReactElement {
  const kiarva_hostname = "https://kiarva.scilifelab.se/";

  return (
    <iframe
      src={kiarva_hostname}
      className="w-screen h-screen overflow-auto"
      title="KIARVA - Knowledge Integration and Automated Reasoning for Variant Analysis"
      aria-label="KIARVA application for variant analysis and genomic data interpretation"
      allowFullScreen
      sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads"
    ></iframe>
  );
}
