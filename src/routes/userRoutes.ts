import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserDisease,
  getUserBySampleId
} from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { UserZodSchema } from "../schemas/userSchema";
import { verifyJWT, allowOnly } from "../middlewares/verifyJWT";
import { DiseaseZodSchema } from "../schemas/IDiseaseSchema";

const router = Router();

// CREATE
router.post("/create-user", validate(UserZodSchema), verifyJWT, allowOnly("OperationsUser", "SuperAdmin"), createUser);
// READ ALL
router.get("/get-users", getUsers);
// READ SINGLE
router.get("/get-user/:id", getUserById);
// UPDATE
router.put("/update-user/:id", validate(UserZodSchema), verifyJWT, allowOnly("OperationsUser", "ReportingUser", "SuperAdmin"), updateUser);
// DELETE
router.delete("/delete-user/:id", deleteUser);

//DISEASE ROUTE
router.put("/update-user-disease/:id", validate(DiseaseZodSchema), verifyJWT, allowOnly("ReportingUser","SuperAdmin"),  updateUserDisease);

// USER BY SAMPLE ID 
router.get("/get-user-by-sample/:sampleId", getUserBySampleId);

export default router;
