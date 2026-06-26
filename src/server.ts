import { errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});