"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diseaseController_1 = require("../controllers/diseaseController");
const router = (0, express_1.Router)();
router.post("/create-disease", diseaseController_1.createDiseaseData);
router.get("/get-disease", diseaseController_1.getAllDiseaseData);
exports.default = router;
