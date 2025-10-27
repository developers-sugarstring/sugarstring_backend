"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseSchema = void 0;
const mongoose_1 = require("mongoose");
const SymptomOrRecommendationSchema = new mongoose_1.Schema({
    desc: { type: String },
    points: [{ type: String }],
}, { _id: false });
const DiseaseDescriptionSchema = new mongoose_1.Schema({
    intro: { type: String },
    symptoms: { type: SymptomOrRecommendationSchema },
    recommendations: { type: SymptomOrRecommendationSchema },
}, { _id: false });
const DiseaseHeaderSchema = new mongoose_1.Schema({
    diseaseName: { type: String },
    speciality: { type: String },
    geneName: { type: String },
    category: {
        type: String,
        enum: [
            "Heart Diseases",
            "Hereditary Cancers",
            "Other Diseases",
            "Unaffected Carrier",
        ],
    },
    diseaseDesc: { type: DiseaseDescriptionSchema },
}, { _id: false });
const DrugSpecialitySchema = new mongoose_1.Schema({
    name: { type: String },
}, { _id: false });
const DrugDetailSchema = new mongoose_1.Schema({
    drugName: { type: String },
    medicalSpeciality: { type: String },
    geneName: { type: String },
    diplotype: { type: String },
    phenotype: { type: String },
    function: { type: String },
    medicalCondition: { type: String },
    similarDrug: { type: String },
    alternativeDrug: { type: String },
    speciality: { type: [DrugSpecialitySchema], default: [] },
}, { _id: false });
const DrugResponseSchema = new mongoose_1.Schema({
    drugsToAvoid: { type: [DrugDetailSchema], default: [] },
    drugsWithCaution: { type: [DrugDetailSchema], default: [] },
}, { _id: false });
const GeneticMutationSchema = new mongoose_1.Schema({
    gene: {
        geneName: { type: String },
        desc: {
            intro: { type: String },
            mid: { type: String },
            end: { type: String },
        },
    },
    mutation: { type: String },
    type: { type: String },
    zygosity: { type: String },
    diseaseName: { type: String },
    inheritance: { type: String },
    classification: { type: String },
}, { _id: false });
exports.DiseaseSchema = new mongoose_1.Schema({
    header: { type: [DiseaseHeaderSchema], default: [] },
    drugResponse: {
        ...DrugResponseSchema.obj,
    },
    geneticMutation: { type: [GeneticMutationSchema], default: [] },
    reportGenerated: { type: Date },
}, { _id: false });
