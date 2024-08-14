import ICountry, { countryModel } from "../models/country";
import { CreateCountryRequest } from "../models/requests/createCountryReq";
import mongoose from "mongoose";

export async function createCountry(
  countryData: CreateCountryRequest
): Promise<ICountry | null> {
  const objectId = new mongoose.Types.ObjectId();

  return await countryModel.create({
    _id: objectId,
    id: objectId.toString(),
    countryNames: {
      tr: countryData.countryNames?.tr || "",
      en: countryData.countryNames?.en || "",
    },
    digram: countryData.digram || "",
    trigram: countryData.trigram || "",
    mmsiCodes: countryData.mmsiCodes,
    midCode: countryData.midCode || "",
    shortCode: countryData.shortCode || countryData.digram,
    flagImage: countryData.flagImage || "",
    isDeleted: false,
    recordTime: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  });
}

export async function getByCountryName(name: string): Promise<ICountry | null> {
  return await countryModel
    .findOne({
      $or: [{ "countryNames.tr": name }, { "countryNames.en": name }],
    })
    .lean();
}

export async function getByMidCode(midCode: string): Promise<ICountry | null> {
  return await countryModel.findOne({ midCode: midCode }).lean();
}

export async function getByDigram(digram: string): Promise<ICountry | null> {
  return await countryModel.findOne({ digram: digram }).lean();
}

export async function getByTrigram(trigram: string): Promise<ICountry | null> {
  return await countryModel.findOne({ trigram: trigram }).lean();
}

export async function getFlagByShortOrMidCode(
  code: string
): Promise<ICountry | null> {
  return await countryModel.findOne({
    $or: [{ midCode: code }, { shortCode: code }],
  });
}
