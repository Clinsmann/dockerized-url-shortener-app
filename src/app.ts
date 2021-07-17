import cors from "cors";
import express, { Application } from "express";

import HomeController from "./controllers/HomeController";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/", HomeController);

export default app;
