import express from "express";

const HomeController = express.Router();
import * as HomeService from "../services/HomeService";

/* fetch Home */
HomeController.get("", HomeService.index);

export default HomeController;
