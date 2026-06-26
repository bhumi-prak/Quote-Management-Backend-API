import axios from "axios";

export const analyzeQuote = async (quoteId: string) => {

  // Replace with your FastAPI URL later
  // const response = await axios.post("http://localhost:8000/analyze", {
  //   quote_id: quoteId,
  // });

  // return response.data;

  // Mock response
  return {
    risk: "Medium",
    confidence: 91,
    missing_items: [
      "Structural drawings",
      "Load requirements",
    ],
  };
};