import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rootRouter from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});



