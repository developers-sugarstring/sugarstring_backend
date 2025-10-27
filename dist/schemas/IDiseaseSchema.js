"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseZodSchema = void 0;
const zod_1 = require("zod");
const SymptomOrRecommendationZod = zod_1.z.object({
    desc: zod_1.z.string(),
    points: zod_1.z.array(zod_1.z.string()),
});
const DiseaseDescriptionZod = zod_1.z.object({
    intro: zod_1.z.string(),
    symptoms: SymptomOrRecommendationZod,
    recommendations: SymptomOrRecommendationZod,
});
const DiseaseHeaderZod = zod_1.z.object({
    diseaseName: zod_1.z.string(),
    speciality: zod_1.z.string(),
    geneName: zod_1.z.string(),
    category: zod_1.z.enum([
        "Heart Diseases",
        "Hereditary Cancers",
        "Other Diseases",
        "Unaffected Carrier",
    ]),
    diseaseDesc: DiseaseDescriptionZod,
});
const DrugSpecialityZod = zod_1.z.object({
    name: zod_1.z.string(),
});
const DrugDetailZod = zod_1.z.object({
    drugName: zod_1.z.string(),
    medicalSpeciality: zod_1.z.string(),
    geneName: zod_1.z.string(),
    diplotype: zod_1.z.string(),
    phenotype: zod_1.z.string(),
    function: zod_1.z.string(),
    medicalCondition: zod_1.z.string(),
    similarDrug: zod_1.z.string(),
    alternativeDrug: zod_1.z.string(),
    speciality: zod_1.z.array(DrugSpecialityZod),
});
const DrugResponseZod = zod_1.z.object({
    drugsToAvoid: zod_1.z.array(DrugDetailZod),
    drugsWithCaution: zod_1.z.array(DrugDetailZod),
});
const GeneticMutationZod = zod_1.z.object({
    gene: zod_1.z.object({
        geneName: zod_1.z.string(),
        desc: zod_1.z.object({
            intro: zod_1.z.string(),
            mid: zod_1.z.string(),
            end: zod_1.z.string(),
        }),
    }),
    mutation: zod_1.z.string(),
    type: zod_1.z.string(),
    zygosity: zod_1.z.string(),
    diseaseName: zod_1.z.string(),
    inheritance: zod_1.z.string(),
    classification: zod_1.z.string(),
});
exports.DiseaseZodSchema = zod_1.z.object({
    header: zod_1.z.array(DiseaseHeaderZod).default([]),
    drugResponse: DrugResponseZod.default({
        drugsToAvoid: [],
        drugsWithCaution: [],
    }),
    geneticMutation: zod_1.z.array(GeneticMutationZod).default([]),
    reportGenerated: zod_1.z.coerce.date(),
}).partial();
