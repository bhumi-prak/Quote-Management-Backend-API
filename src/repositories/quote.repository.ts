import prisma from "../utils/prisma";

export interface CreateQuoteInput {
  customer: string;
  project: string;
  estimated_value: number;
}

export const createQuote = async (data: CreateQuoteInput) => {
  return prisma.quoteRequest.create({
    data: {
      customer: data.customer,
      project: data.project,
      estimated_value: data.estimated_value,
      status: "New",
    },
  });
};

export const getAllQuotes = async (
  page: number,
  limit: number
) => {

  return prisma.quoteRequest.findMany({

    skip: (page - 1) * limit,

    take: limit,

    orderBy: {
      created_date: "desc",
    },

  });

};

export const getQuoteById = async (id: string) => {
  return prisma.quoteRequest.findUnique({
    where: {
      id,
    },
    include: {
      analysisResult: true,
    },
  });
};

export const saveAnalysis = async (
  quoteId: string,
  risk: string,
  confidence: number,
  missingItems: string[]
) => {
  return prisma.analysisResult.create({
    data: {
      quote_id: quoteId,
      risk,
      confidence,
      missing_items: JSON.stringify(missingItems),
    },
  });
};


export const updateQuoteStatus = async (
  id: string,
  status: string
) => {
  return prisma.quoteRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};


export const searchQuotes = async (search: string) => {
  return prisma.quoteRequest.findMany({
    where: {
      OR: [
        {
          customer: {
            contains: search,
          },
        },
        {
          project: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {
      created_date: "desc",
    },
  });
};