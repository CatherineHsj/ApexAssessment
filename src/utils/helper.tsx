export const getCurrencies = (currencies: any) => {
  const currencyCodes = Object.keys(currencies);
  return currencyCodes.map((code) => `${currencies[code].name} (${currencies[code].symbol})`).join(', ');
};