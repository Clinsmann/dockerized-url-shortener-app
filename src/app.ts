import cors from "cors";
import express, { Application } from "express";

// import FactController from "./controllers/FactController";
// import HomeController from "./controllers/HomeController";
// import IssueController from "./controllers/IssueController";
// import CountryController from "./controllers/CountryController";

const app: Application = express();
app.use(cors());
app.use(express.json());

// index.get('/', (req: Request, res: Response) => res.status(200).send('hello'));

// app.use("/api/", HomeController);
//
// app.use("/api/facts", FactController);
// app.use("/api/issues", IssueController);
// app.use("/api/countries", CountryController);

export default app;
