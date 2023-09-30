export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: [string];
  region: string;
  population: string;
}

export interface CountryDetailData {
  name: string;
  languages: string;
  population: number;
  region: string;
  borderCountries: string[];
  image: string;
  tld: string;
  currencies: string;
  capitals: string;
}