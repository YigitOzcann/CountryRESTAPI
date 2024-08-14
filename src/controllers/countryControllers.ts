import { Router, Request, Response } from "express";
import * as countryService from "../services/countryServices";
import * as apiUtil from "../helpers/apiUtils";
import { routeHandler } from "../helpers/routeHandler";
import { countryModel } from "../models/country";

const router = Router();

export async function healthcheck(req: Request, res: Response) {
  return { status: 200, response: "Country Service is ready!!" };
}

export async function apiUtilReq(req: Request, res: Response) {
  const response = await apiUtil.fetchCountryData();
  return { status: 200, response: response };
}

export const saveCountries = async (req: Request, res: Response) => {
  try {
    const countryData = await apiUtil.fetchCountryData();

    for (const country of countryData) {
      await countryService.saveCountries(country);
    }

    res.status(200).json({ message: "Countries imported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error importing countries" });
  }
};

export async function getByCountryName(req: Request, res: Response) {
  const { name } = req.params;
  const response = await countryService.getByCountryName(name);
  return {
    status: 200,
    response: response,
  };
}

export async function getByMidCode(req: Request, res: Response) {
  const { midCode } = req.params;
  const response = await countryService.getByMidCode(midCode);
  return {
    status: 200,
    response: response,
  };
}

export async function getByDigram(req: Request, res: Response) {
  const { digram } = req.params;
  const response = await countryService.getByDigram(digram);
  return {
    status: 200,
    response: response,
  };
}

export async function getByTrigram(req: Request, res: Response) {
  const { trigram } = req.params;
  const response = await countryService.getByTrigram(trigram);
  return {
    status: 200,
    response: response,
  };
}

export async function getFlagByShortOrMidCode(req: Request, res: Response) {
  const { code } = req.params;
  const response = await countryService.getFlagByShortOrMidCode(code);
  if (response && response.flagImage) {
    return res.status(200).json({
      flagImage: response.flagImage,
    });
  }
}

router.post("/", routeHandler(saveCountries));
router.get("/by/name/:name", routeHandler(getByCountryName));
router.get("/by/midcode/:midCode", routeHandler(getByMidCode));
router.get("/by/digram/:digram", routeHandler(getByDigram));
router.get("/by/trigram/:trigram", routeHandler(getByTrigram));
router.get("/healthcheck", routeHandler(healthcheck));
router.get(
  "/getFlag/ShortAndMidCode/:code",
  routeHandler(getFlagByShortOrMidCode)
);

export default router;
