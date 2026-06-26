import { Request, Response } from "express";
import * as quoteService from "../services/quote.service";
import { createQuoteSchema } from "../utils/validation";

export const createQuote = async (req: Request, res: Response) => {
  try {
    const result = createQuoteSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { customer, project, estimated_value } = result.data;

    const quote = await quoteService.createQuote(
      customer,
      project,
      estimated_value
    );

    res.status(201).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create quote",
    });
  }
};

export const getAllQuotes = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const quotes = await quoteService.getAllQuotes(
      page,
      limit
    );

    res.json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch quotes",
    });
  }
};

export const getQuoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const quote = await quoteService.getQuoteById(id as string);

    if (!quote) {
      res.status(404).json({
        success: false,
        message: "Quote not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quote,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch quote",
    });
  }
};


export const analyzeQuote = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const result = await quoteService.analyzeQuote(req.params.id as string);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    if (error.message === "Quote not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });

  }
};


export const updateQuoteStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedQuote = await quoteService.updateQuoteStatus(id as string, status);

    res.status(200).json({
      success: true,
      data: updatedQuote,
    });
  } catch (error: any) {
    if (error.message === "Quote not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (error.message === "Invalid status") {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update status",
    });
  }
};


export const searchQuotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search as string;

    if (!search) {
      res.status(400).json({
        success: false,
        message: "Search query is required",
      });
      return;
    }

    const quotes = await quoteService.searchQuotes(search);

    res.status(200).json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to search quotes",
    });
  }
};