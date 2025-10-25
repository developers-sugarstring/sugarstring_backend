// models/Disease.ts
import { Schema, model, Document } from "mongoose";

// --- TypeScript interfaces ---

interface Symptom {
  desc: string;
  points: string[];
}

interface Recommendation {
  desc: string;
  points: string[];
}

interface Disease {
  diseaseName: string;
  speciality: string;
  intro: string;
  symptoms: Symptom;
  recommendations: Recommendation;
}

interface Gene {
  geneName: string;
  intro: string;
  mid: string;
}

interface Drug {
  drugName: string;
  medicalSpeciality: string;
  function: string;
  medicalCondition: string;
  similarDrug: string;
  alternativeDrug: string;
}

interface Mutations {
  type: string[];
  zygosity: string[];
  inheritance: string[];
  classification: string[];
}

export interface IDiseaseData extends Document {
  category: string[];
  diseases: Disease[];
  genes: Gene[];
  drugs: Drug[];
  mutations: Mutations;
}

// --- Mongoose schema ---

const SymptomSchema = new Schema<Symptom>({
  desc: { type: String, required: true },
  points: { type: [String], required: true },
});

const RecommendationSchema = new Schema<Recommendation>({
  desc: { type: String, required: true },
  points: { type: [String], required: true },
});

const DiseaseSchema = new Schema<Disease>({
  diseaseName: { type: String, required: true },
  speciality: { type: String, required: true },
  intro: { type: String, required: true },
  symptoms: { type: SymptomSchema, required: true },
  recommendations: { type: RecommendationSchema, required: true },
});

const GeneSchema = new Schema<Gene>({
  geneName: { type: String, required: true },
  intro: { type: String, required: true },
  mid: { type: String, required: true },
});

const DrugSchema = new Schema<Drug>({
  drugName: { type: String, required: true },
  medicalSpeciality: { type: String, required: true },
  function: { type: String, required: true },
  medicalCondition: { type: String, required: true },
  similarDrug: { type: String, required: true },
  alternativeDrug: { type: String, required: true },
});

const MutationsSchema = new Schema<Mutations>({
  type: { type: [String], required: true },
  zygosity: { type: [String], required: true },
  inheritance: { type: [String], required: true },
  classification: { type: [String], required: true },
});

const DiseaseDataSchema = new Schema<IDiseaseData>({
  category: { type: [String], required: true },
  diseases: { type: [DiseaseSchema], required: true },
  genes: { type: [GeneSchema], required: true },
  drugs: { type: [DrugSchema], required: true },
  mutations: { type: MutationsSchema, required: true },
});

export const DiseaseModel = model<IDiseaseData>("ExcelDisease", DiseaseDataSchema);
