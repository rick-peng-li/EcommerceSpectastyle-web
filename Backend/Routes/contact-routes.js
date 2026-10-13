import express from "express";
import { submitContact, getAllContacts } from "../Controller/contact-controller.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", getAllContacts);

export default router;
