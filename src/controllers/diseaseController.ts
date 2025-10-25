import { Request, Response } from "express";
import { DiseaseModel } from "../models/excelDisease";

export const createDiseaseData = async (req: Request, res: Response) => {
  try {
    const { category, diseases, genes, drugs, mutations } = req.body;

    const updatedData = await DiseaseModel.findOneAndUpdate(
      {},
      { category, diseases, genes, drugs, mutations },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: "Data stored successfully!", data: updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to store data" });
  }
};


export const getAllDiseaseData = async (_req: Request, res: Response) => {
  try {
    const allData = await DiseaseModel.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch data" });
  }
};
