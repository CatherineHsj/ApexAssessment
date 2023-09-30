import React, { useEffect, useState } from 'react';
import { Spin, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../../api/country';
import { Country } from '../../types/country';
import Description from '../../components/common/description';
import { useTheme } from '../../components/ThemeProvider';

const { Search } = Input;
const { Option } = Select;

const BATCH_SIZE = 12;

const CountryListing: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [batchIndex, setBatchIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCountries();

        const sortedRegions = Array.from(
          new Set(response.map((country) => country.region))
        ).filter(Boolean).slice().sort();

        setRegions(sortedRegions);
        setCountries(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredCountries = countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === '' || country.region === selectedRegion)
      );
    });
    setFilteredCountries(filteredCountries)

    console.log(filteredCountries.length)
    const endIndex = batchIndex * BATCH_SIZE;
    const newVisibleCountries = filteredCountries.slice(0, endIndex);
    setVisibleCountries(newVisibleCountries);
  }, [batchIndex, countries, searchTerm, selectedRegion]);

  const loadNextBatch = () => {
    if (batchIndex * BATCH_SIZE < countries.length) {
      setBatchIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setBatchIndex(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setBatchIndex(1);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setBatchIndex(1);
  };

  return (
    <div className="h-full">
      <Spin spinning={loading}>
        <div className="container mx-auto flex items-center justify-between py-4">
          <Search
            placeholder="Search by country name"
            onSearch={handleSearch}
            onChange={handleSearchInputChange}
            style={{ width: 300 }}
            className={theme === 'dark' ? 'search-input-dark' : 'search-input-light'}
          />
          <Select
            placeholder="Filter by region"
            style={{ width: 200 }}
            onChange={handleRegionChange}
            value={selectedRegion}
            className={theme === 'dark' ? 'select-dark' : 'select-light'}
            dropdownStyle={{ backgroundColor: theme === 'dark' ? '#202C36' : 'white' }}
          >
            <Option className={theme === 'dark' ? 'select-dark' : 'select-light'} value="">All</Option>
            {regions.map((region) => (
              <Option className={theme === 'dark' ? 'select-dark' : 'select-light'} key={region} value={region}>
                {region}
              </Option>
            ))}
          </Select>
        </div>
        <div className='container mx-auto items-center py-4'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-4">
            {visibleCountries.map((country) => (
              <Link
                to={`/country/detail/${country.name.common}`}
                key={country.name.common}
                className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div
                  className={`p-4 rounded box-with-shadow transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'bg-lightdark border-white' : 'bg-white'
                    }`}
                  key={country.name.common}
                >
                  <img
                    src={country.flags?.png}
                    alt={country.name.common}
                    className="mx-auto mb-2 h-40 w-100"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-semibold">{country.name.common || ''}</h2>
                  <Description label="Population" value={country.population.toLocaleString() || ''} />
                  <Description label="Region" value={country.region || ''} />
                  <Description label="Capital" value={country.capital && country.capital[0] ? country.capital[0] : ''} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {visibleCountries.length < countries.length && visibleCountries.length < filteredCountries.length && (
          <div className={`text-center mt-4`}>
            <Button className={`${theme === 'dark' ? 'text-white' : ''}`} onClick={loadNextBatch}>
              Load More
            </Button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default CountryListing;
