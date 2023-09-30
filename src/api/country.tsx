import axios from 'axios';
import { Country, CountryDetailData } from '../types/country';
import { getCurrencies } from '../utils/helper';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCountryDetail = async (countryName: string) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${countryName}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const countryData = data[0];
      const borderCountries = countryData.borders || [];
      let borderCountryNames: string[] = [];

      if (borderCountries.length > 0) {
        const borderResponse = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${borderCountries.join(',')}`
        );

        if (!borderResponse.ok) {
          throw new Error(`Failed to fetch data for border countries`);
        }

        const borderData = await borderResponse.json();

        borderCountryNames = borderData.map((borderCountry: Country) => {
          return borderCountry.name.common;
        });
      }

      const countryDetail: CountryDetailData = {
        name: countryData.name.common,
        languages: Object.values(countryData.languages || {}).join(','),
        population: countryData.population || 0,
        region: countryData.region || '',
        borderCountries: borderCountryNames,
        image: countryData.flags?.png || '',
        tld: countryData.tld.join(','),
        currencies: getCurrencies(countryData.currencies),
        capitals: countryData.capital.join(','),
      };

      return countryDetail;
    } else {
      throw new Error(`Country data not found for ${countryName}`);
    }
  } catch (error: any) {
    throw new Error(`Error fetching country detail: ${error.message}`);
  }
};