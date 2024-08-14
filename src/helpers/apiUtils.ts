import axios from "axios";
import { CreateCountryRequest } from "../models/requests/createCountryReq";

export async function fetchCountryData(): Promise<CreateCountryRequest[]> {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    const data = response.data;

    const formattedData: CreateCountryRequest[] = data.map((country: any) => {
      return {
        countryNames: {
          en: country.name?.common || "",
          tr: country.translations?.tur?.common || "",
        },
        digram: country.cca2 || "",
        trigram: country.cca3 || "",
        mmsiCodes: [],
        midCode: country.ccn3 || "",
        shortCode: "",
        flagImage: country.flags?.svg || "",
      };
    });

    return formattedData;
  } catch (error) {
    throw new Error("Error fetching country data from open source site");
  }
}
