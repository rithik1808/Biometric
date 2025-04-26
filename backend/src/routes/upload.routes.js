import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.any(), uploadFile);

export default router;
