import { Router } from "express";
import { createDiseaseData, getAllDiseaseData } from "../controllers/diseaseController";

const router = Router();

router.post("/create-disease", createDiseaseData);
router.get("/get-disease", getAllDiseaseData); 

export default router;
