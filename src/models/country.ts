import { Schema, model, Document } from "mongoose";

export default interface ICountry extends Document {
  id?: string;
  countryNames?: {
    en: string;
    tr: string;
  };
  digram?: string;
  trigram?: string;
  mmsiCodes?: string[];
  midCode?: string;
  shortCode?: string;
  flagImage?: string;
  recordTime?: {
    createdAt?: number;
    updatedAt?: number;
  };
  isDeleted?: boolean;
}

const countrySchema = new Schema<ICountry>({
  id: { type: String, required: false, unique: true },
  countryNames: {
    en: { type: String, required: false },
    tr: { type: String, required: false },
  },
  digram: { type: String, required: false },
  trigram: { type: String, required: false },
  mmsiCodes: { type: [String], required: false },
  midCode: { type: String, required: false },
  shortCode: { type: String, required: false },
  flagImage: { type: String, required: false },
  recordTime: {
    createdAt: { type: Number, required: false },
    updatedAt: { type: Number, required: false },
  },
  isDeleted: { type: Boolean, default: false },
});

const countryModel = model<ICountry>("Country", countrySchema);

export { countryModel, countrySchema, ICountry };
