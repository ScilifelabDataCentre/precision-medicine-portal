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
