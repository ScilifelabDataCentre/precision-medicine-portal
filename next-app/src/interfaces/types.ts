export interface ILink {
  text: string;
  link: string;
}

export interface IDataSourceFilters {
  dataTypes: string[];
  diseaseTypes: string[];
}

export interface IDataSourcesDC {
  data: string[];
  ddls: string[];
  description: string;
  name: string;
  search_tags: string[];
  target: string[];
  thumbnail: string;
  thumbnail_border?: boolean;
  type: string[];
  url: string;
  disease_type: string[];
}

export interface IRegistryFilters {
  registryCentre: string[];
  registryCategory: string[];
}

export interface IRegistrySource {
  name: string;
  url: string;
  Information: string;
  start_date: string;
  registry_centre: string[];
  category: string[];
  search_tags: string[];
  /**
   * Primary external metadata/catalogue source, typically "SKR" or "RCC".
   * Omit when there is no separate catalogue page (e.g. metadata URL equals official URL).
   */
  metadata_source?: string;
  /** URL for the primary metadata/catalogue page. Must differ from `url`. */
  metadata_url?: string;
  /**
   * ISO date (YYYY-MM-DD) on which this entry's links and description were last
   * checked against the registry's own site. Provenance only — not rendered;
   * the page shows a single site-wide date via `<LastUpdated />`.
   */
  last_verified?: string;
}

export const filters: IRegistryFilters = {
  registryCentre: [
    "Kvalitetsregistercentrum Stockholm",
    "Registercentrum Norr",
    "Registercentrum Syd",
    "Registercentrum Sydost",
    "Registercentrum Västra Götaland",
    "Regionala Cancercentrum i Samverkan",
    "Uppsala Clinical Research Center",
  ],
  registryCategory: [
    "National cancer quality registry",
    "National quality registry",
    "Other quality registry",
  ],
};
