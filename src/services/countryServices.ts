import * as countryRepository from "../repositories/countryRepository";
import { CreateCountryRequest } from "../models/requests/createCountryReq";
import ICountry from "../models/country";

export async function saveCountries(
  body: CreateCountryRequest
): Promise<ICountry | null> {
  body.mmsiCodes = [body.midCode, ...body.mmsiCodes];
  return await countryRepository.createCountry(body);
}

export async function getByCountryName(name: string): Promise<ICountry | null> {
  return await countryRepository.getByCountryName(name);
}

export async function getByMidCode(midCode: string): Promise<ICountry | null> {
  return await countryRepository.getByMidCode(midCode);
}

export async function getByDigram(digram: string): Promise<ICountry | null> {
  return await countryRepository.getByDigram(digram);
}

export async function getByTrigram(trigram: string): Promise<ICountry | null> {
  return await countryRepository.getByTrigram(trigram);
}

export async function getFlagByShortOrMidCode(
  code: string
): Promise<ICountry | null> {
  return await countryRepository.getFlagByShortOrMidCode(code);
}
