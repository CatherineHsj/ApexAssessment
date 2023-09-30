import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CountryListing from './pages/Country/listing';
import CountryDetail from './pages/Country/detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/country/listing" />} />
        <Route path="/country/listing" element={<CountryListing />} />
        <Route path="/country/detail/:countryName" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
