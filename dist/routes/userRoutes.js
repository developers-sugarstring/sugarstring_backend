"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validate_1 = require("../middlewares/validate");
const userSchema_1 = require("../schemas/userSchema");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const IDiseaseSchema_1 = require("../schemas/IDiseaseSchema");
const router = (0, express_1.Router)();
// CREATE
router.post("/create-user", (0, validate_1.validate)(userSchema_1.UserZodSchema), verifyJWT_1.verifyJWT, (0, verifyJWT_1.allowOnly)("OperationsUser", "SuperAdmin"), userController_1.createUser);
// READ ALL
router.get("/get-users", userController_1.getUsers);
// READ SINGLE
router.get("/get-user/:id", userController_1.getUserById);
// UPDATE
router.put("/update-user/:id", (0, validate_1.validate)(userSchema_1.UserZodSchema), verifyJWT_1.verifyJWT, (0, verifyJWT_1.allowOnly)("OperationsUser", "ReportingUser", "SuperAdmin"), userController_1.updateUser);
// DELETE
router.delete("/delete-user/:id", userController_1.deleteUser);
//DISEASE ROUTE
router.put("/update-user-disease/:id", (0, validate_1.validate)(IDiseaseSchema_1.DiseaseZodSchema), verifyJWT_1.verifyJWT, (0, verifyJWT_1.allowOnly)("ReportingUser", "SuperAdmin"), userController_1.updateUserDisease);
// USER BY SAMPLE ID 
router.get("/get-user-by-sample/:sampleId", userController_1.getUserBySampleId);
exports.default = router;
