import { IUser } from "./User";

export interface ISymptomOrRecommendation {
  desc: string;
  points: string[]; 
}

export interface IDiseaseDescription {
  intro: string;
  symptoms: ISymptomOrRecommendation;
  recommendations: ISymptomOrRecommendation;
}

export type DiseaseCategoryType =
  | "Heart Diseases"
  | "Hereditary Cancers"
  | "Other Diseases"
  | "Unaffected Carrier";

export interface IDiseaseHeader {
  diseaseName: string;
  speciality: string;
  geneName: string;
  category: DiseaseCategoryType; 
  diseaseDesc: IDiseaseDescription;
}

export interface IDrugSpeciality {
  name: string;
}

export interface IDrugDetail {
  drugName: string;
  medicalSpeciality: string;
  geneName: string;
  diplotype: string;
  phenotype: string;
  function: string;
  medicalCondition: string;
  similarDrug: string;
  alternativeDrug: string; 
  speciality: IDrugSpeciality[];
}

export interface IDrugResponse {
  drugsToAvoid: IDrugDetail[];
  drugsWithCaution: IDrugDetail[];
}

export interface IGeneticMutation {
  gene: {
    geneName: string;
    desc: {
      intro: string;
      mid: string;
      end: string;
    };
  };
  mutation: string;
  type: string;
  zygosity: string;
  diseaseName: string;
  inheritance: string;
  classification: string;
}

export interface IDisease extends IUser {
    header: IDiseaseHeader[];
    drugResponse: IDrugResponse;
    geneticMutation: IGeneticMutation[];
    reportGenerated: Date;
}
