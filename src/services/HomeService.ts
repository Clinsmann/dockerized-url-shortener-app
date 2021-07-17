import { Request, Response } from "express";
import  HttpStatus from "http-status-codes";

export const index = function (req: Request, res: Response) {
  res.status(HttpStatus.OK).json({ message: "application up and running..." });
};
