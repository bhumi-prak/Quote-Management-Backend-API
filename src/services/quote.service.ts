import * as quoteRepository from "../repositories/quote.repository";
import * as analysisService from "./analysis.service";


export const createQuote = async (
  customer: string,
  project: string,
  estimated_value: number
) => {
  return quoteRepository.createQuote({
    customer,
    project,
    estimated_value,
  });
};

export const getAllQuotes = async (
  page: number,
  limit: number
) => {

  return quoteRepository.getAllQuotes(page, limit);

};

export const getQuoteById = async (id: string) => {
  return quoteRepository.getQuoteById(id);
};

export const analyzeQuote = async (id: string) => {

  const quote = await quoteRepository.getQuoteById(id);
  const analysis = await analysisService.analyzeQuote(id);
  if (!quote) {
    throw new Error("Quote not found");
  }


  const savedAnalysis = await quoteRepository.saveAnalysis(
    id,
    analysis.risk,
    analysis.confidence,
    analysis.missing_items
  );

  return {
    quote,
    analysis: savedAnalysis
  };
};


const allowedStatuses = [
  "New",
  "In Review",
  "Needs Info",
  "Completed",
];

export const updateQuoteStatus = async (
  id: string,
  status: string
) => {
  const quote = await quoteRepository.getQuoteById(id);

  if (!quote) {
    throw new Error("Quote not found");
  }

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  return quoteRepository.updateQuoteStatus(id, status);
};


export const searchQuotes = async (search: string) => {
  return quoteRepository.searchQuotes(search);
};