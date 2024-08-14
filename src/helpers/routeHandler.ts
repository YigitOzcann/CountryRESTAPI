import { Request, Response } from "express";
import { CustomError } from "../models/Exception";

export function routeHandler(func: Function) {
  return async (req: Request, res: Response) => {
    try {
      const result = await func(req, res);

      if (result) {
        return res.status(result.status).json(result.response);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.code).json(error);
      } else {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}
