import { z } from "zod";

const SymptomOrRecommendationZod = z.object({
  desc: z.string(),
  points: z.array(z.string()),
});

const DiseaseDescriptionZod = z.object({
  intro: z.string(),
  symptoms: SymptomOrRecommendationZod,
  recommendations: SymptomOrRecommendationZod,
});

const DiseaseHeaderZod = z.object({
  diseaseName: z.string(),
  speciality: z.string(),
  geneName: z.string(),
  category: z.enum([
    "Heart Diseases",
    "Hereditary Cancers",
    "Other Diseases",
    "Unaffected Carrier",
  ]),
  diseaseDesc: DiseaseDescriptionZod,
});

const DrugSpecialityZod = z.object({
  name: z.string(),
});

const DrugDetailZod = z.object({
  drugName: z.string(),
  medicalSpeciality: z.string(),
  geneName: z.string(),
  diplotype: z.string(),
  phenotype: z.string(),
  function: z.string(),
  medicalCondition: z.string(),
  similarDrug: z.string(),
  alternativeDrug: z.string(),
  speciality: z.array(DrugSpecialityZod),
});

const DrugResponseZod = z.object({
  drugsToAvoid: z.array(DrugDetailZod),
  drugsWithCaution: z.array(DrugDetailZod),
});

const GeneticMutationZod = z.object({
  gene: z.object({
    geneName: z.string(),
    desc: z.object({
      intro: z.string(),
      mid: z.string(),
      end: z.string(),
    }),
  }),
  mutation: z.string(),
  type: z.string(),
  zygosity: z.string(),
  diseaseName: z.string(),
  inheritance: z.string(),
  classification: z.string(),
});

export const DiseaseZodSchema = z.object({
  header: z.array(DiseaseHeaderZod).default([]),
  drugResponse: DrugResponseZod.default({
    drugsToAvoid: [],
    drugsWithCaution: [],
  }),
  geneticMutation: z.array(GeneticMutationZod).default([]),
  reportGenerated: z.coerce.date(),
}).partial();

