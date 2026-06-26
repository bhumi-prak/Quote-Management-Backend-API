import { Router } from "express";
import * as quoteController from "../controllers/quote.controller";

const router = Router();

router.get("/", quoteController.getAllQuotes);

router.get("/search", quoteController.searchQuotes);

router.get("/:id", quoteController.getQuoteById);

router.post("/", quoteController.createQuote);

router.get("/:id", quoteController.getQuoteById);


router.post("/:id/analyze", quoteController.analyzeQuote);

router.patch("/:id/status", quoteController.updateQuoteStatus);

export default router;