import express from "express";
import { submitFeedback, getAllFeedback } from "../Controller/feedback-controller.js";

const router = express.Router();

router.post("/", submitFeedback);
router.get("/", getAllFeedback);

export default router;
