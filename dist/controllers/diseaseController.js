"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiseaseData = exports.createDiseaseData = void 0;
const excelDisease_1 = require("../models/excelDisease");
const createDiseaseData = async (req, res) => {
    try {
        const { category, diseases, genes, drugs, mutations } = req.body;
        const updatedData = await excelDisease_1.DiseaseModel.findOneAndUpdate({}, { category, diseases, genes, drugs, mutations }, { upsert: true, new: true });
        res.status(200).json({ success: true, message: "Data stored successfully!", data: updatedData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to store data" });
    }
};
exports.createDiseaseData = createDiseaseData;
const getAllDiseaseData = async (_req, res) => {
    try {
        const allData = await excelDisease_1.DiseaseModel.find();
        res.status(200).json(allData);
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
};
exports.getAllDiseaseData = getAllDiseaseData;
