"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseModel = void 0;
// models/Disease.ts
const mongoose_1 = require("mongoose");
// --- Mongoose schema ---
const SymptomSchema = new mongoose_1.Schema({
    desc: { type: String, required: true },
    points: { type: [String], required: true },
});
const RecommendationSchema = new mongoose_1.Schema({
    desc: { type: String, required: true },
    points: { type: [String], required: true },
});
const DiseaseSchema = new mongoose_1.Schema({
    diseaseName: { type: String, required: true },
    speciality: { type: String, required: true },
    intro: { type: String, required: true },
    symptoms: { type: SymptomSchema, required: true },
    recommendations: { type: RecommendationSchema, required: true },
});
const GeneSchema = new mongoose_1.Schema({
    geneName: { type: String, required: true },
    intro: { type: String, required: true },
    mid: { type: String, required: true },
});
const DrugSchema = new mongoose_1.Schema({
    drugName: { type: String, required: true },
    medicalSpeciality: { type: String, required: true },
    function: { type: String, required: true },
    medicalCondition: { type: String, required: true },
    similarDrug: { type: String, required: true },
    alternativeDrug: { type: String, required: true },
});
const MutationsSchema = new mongoose_1.Schema({
    type: { type: [String], required: true },
    zygosity: { type: [String], required: true },
    inheritance: { type: [String], required: true },
    classification: { type: [String], required: true },
});
const DiseaseDataSchema = new mongoose_1.Schema({
    category: { type: [String], required: true },
    diseases: { type: [DiseaseSchema], required: true },
    genes: { type: [GeneSchema], required: true },
    drugs: { type: [DrugSchema], required: true },
    mutations: { type: MutationsSchema, required: true },
});
exports.DiseaseModel = (0, mongoose_1.model)("ExcelDisease", DiseaseDataSchema);
