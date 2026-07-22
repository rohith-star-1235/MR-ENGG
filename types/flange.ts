export type FlangeCategory = "general" | "closure" | "transition" | "equipment";

export type Flange = {
  id: string;
  name: string;
  shortName: string;
  code: string;
  category: FlangeCategory;
  connection: string;
  standard: string;
  pressureClasses: number[];
  sizeRange: string;
  pressureUse: string;
  fatigue: string;
  cost: string;
  summary: string;
  applications: string[];
  advantages: string[];
  limitations: string[];
  inspection: string[];
  fieldNotes: string[];
  manufacturing: string[];
  failures: { mode: string; cause: string; prevention: string }[];
  relatedStandards: string[];
};
