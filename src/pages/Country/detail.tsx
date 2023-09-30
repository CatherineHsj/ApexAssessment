import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import Description from '../../components/common/description';
import { CountryDetailData } from '../../types/country';
import { fetchCountryDetail } from '../../api/country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../../components/ThemeProvider';;

const CountryDetail: React.FC = () => {
  const { countryName } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [countryDetail, setCountryDetail] = useState<CountryDetailData>({
    name: '',
    languages: '',
    population: 0,
    region: '',
    image: '',
    tld: '',
    capitals: '',
    currencies: '',
    borderCountries: [],
  });

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const countryDetail = await fetchCountryDetail(countryName || '');
        setCountryDetail(countryDetail);
        setLoading(false)
      } catch (error: any) {
        console.error(error.message);
        setLoading(false)
      }
    };

    fetchCountryData();
  }, [countryName]);

  const handleBorderCountryClick = (borderCountryName: string) => {
    window.location.href = `/country/detail/${encodeURIComponent(borderCountryName)}`;
  };

  const handleGoBack = () => {
    navigate('/country/listing');
  };

  return (
    <div>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Button
          type="default"
          onClick={handleGoBack}
          icon={<FontAwesomeIcon icon={faBackward} />}
          className={`border ${theme === 'dark' ? 'dark-button' : 'light-button'}`}
        >
          Go Back
        </Button>
      </div>

      <div className="container mx-auto items-center justify-between py-4 flex flex-col lg:flex-row p-5">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Spin spinning={loading}>
            <img
              src={countryDetail.image}
              alt={''}
              className="h-auto lg:mx-0"
              loading="lazy"
            />
          </Spin>
        </div>

        <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
          <h2 className="text-2xl font-semibold text-center lg:text-left">
            {countryDetail.name}
          </h2>

          <div className="border rounded-lg shadow-lg p-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Description label="Native Name" value={countryDetail.name || ''} />
              <Description label="Top Level Domain" value={countryDetail.tld || ''} />
              <Description label="Population" value={countryDetail.population.toLocaleString() || ''} />
              <Description label="Currencies" value={countryDetail.currencies || ''} />
              <Description label="Region" value={countryDetail.region || ''} />
              <Description label="Languages" value={countryDetail.languages || ''} />
              <Description label="Capital" value={countryDetail.capitals || ''} />
            </div>

            {countryDetail.borderCountries.length > 0 && (
              <div className='flex flex-wrap mt-4'>
                <strong className="font-bold mt-2">Border Countries : </strong>
                <div>
                  {countryDetail.borderCountries.map((borderCountry) => (
                    <Button
                      key={borderCountry}
                      className="ml-2 mt-2"
                      style={{
                        background: 'gray',
                        borderColor: 'gray',
                        color: 'white',
                      }}
                      onClick={() => handleBorderCountryClick(borderCountry)}
                    >
                      {borderCountry}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
