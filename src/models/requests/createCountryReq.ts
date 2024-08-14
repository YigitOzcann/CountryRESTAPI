export interface CreateCountryRequest {
  countryNames: {
    en: string;
    tr: string;
  };
  digram: string;
  trigram: string;
  mmsiCodes: string[];
  midCode: string;
  shortCode: string;
  flagImage: string;
}
