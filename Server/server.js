import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
const morgan = require("morgan");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((err) => console.log("Dtat Base Connection Error..", err));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// routs
readdirSync("./routes").map((f) => app.use("/api", require(`./routes/${f}`)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server runing on port ${port}`));
