import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MapPage from './components/MapPage';
import PopUp from './components/PopUp';
import { fetchCurrentWeather, fetchForecast } from './api/weather';
import { fetchTidalData } from './api/marine';
import boatIcon from './components/assets/icons8-boat-64.svg';

// Main App component managing state, data fetching, and page navigation.

//const windyurl = 'https://embed.windy.com/embed2.html?lat=50.9&lon=-1.5&zoom=7&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&metricWind=kt&metricTemp=°C&radarRange=-1';

function App() {
  const [City, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [tidalHeight, setTidalHeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windyUrl, setWindyUrl] = useState('');
  const [page, setPage] = useState('dashboard');
  const [showPopup, setShowPopup] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  // Load Portsmouth automatically on first load
  useEffect(() => {
    handleSearch('Portsmouth');
  }, []);

  async function handleSearch(searchCity) {
    if (!searchCity.trim()) {
      setError('Enter a city');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const current = await fetchCurrentWeather(searchCity);
      const forecast = await fetchForecast(searchCity);

      setCurrentWeather(current);
      setForecastData(forecast);

      const lat = current.coord.lat;
      const lon = current.coord.lon;

      try {
        const tidal = await fetchTidalData(lat, lon);
        setTidalHeight(tidal);
      } catch {
        console.warn("Tidal data unavailable (likely an inland location).");
        setTidalHeight(null);
      }

      // Windy embeded URL using the location coordinates
      setWindyUrl(
        `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=10&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${lat}&detailLon=${lon}&metricWind=kt&metricTemp=°C&radarRange=-1`
      )

      setCity(searchCity);
      setPage('dashboard');
    } 
    catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecastData(null);
      setTidalHeight(null);
    } 
    finally {
      setLoading(false);
    }
  }

  async function handleHomePage() {
    setCurrentWeather(null);
    setForecastData(null);
    setTidalHeight(null);
    setCity('');
    setPage('home');
  }

  /* WRAPPER FUNCTIONS FOR POPUP
  Reasoning: Because this app provides critical safety information for sailing, 
  we must ensure the user acknowledges that this is a guidance tool only. 
  These wrappers intercept UI interactions (Search/Menu) and force the legal 
  disclaimer popup to appear first if they haven't accepted it yet.
  */

  function handleSearchWithPopup(searchCity) {
    if (!hasAccepted) {
      setShowPopup(true);
    } else {
      handleSearch(searchCity);
    }
  }

  function handleSidebarWithPopup() {
    if (!hasAccepted) {
      setShowPopup(true);
    } else {
      setSidebarOpen(true);
    }
  }

  function handleHomePage() {
    handleSearch('Portsmouth');
    setPage('dashboard');
  }

  const currentTidalValue = tidalHeight?.wave_height ? tidalHeight.wave_height[0] : null;
  const windspeed = currentWeather ? Math.round(currentWeather.wind.speed * 1.94384) : 0;
  const gustspeed = currentWeather?.wind?.gust != null
      ? Math.round(currentWeather.wind.gust * 1.94384)
      : windspeed;
  const visibility = currentWeather?.visibility != null
      ? currentWeather.visibility / 1000
      : 0;
  
  // ── Map page — full screen Windy ──────────────────────────────
  if (page === 'map') {
    return (
      <MapPage
        windyUrl={windyUrl}
        locationName={currentWeather?.name ?? ''}
        onBack={() => setPage('dashboard')}
      />
    )
  }

   // ── Dashboard page ──────────────────────────────
  if(page === 'dashboard') {
    return (
      <div className="app">
        
        {/* The Disclaimer Popup */}
        <PopUp 
          isOpen={showPopup} 
          title="Welcome to SailCast" 
          onClose={() => {
            setHasAccepted(true);
            setShowPopup(false);
          }}
        >
          <p>Please remember that SailCast is a tool for guidance only. Always check official maritime forecasts before sailing.</p>
          <button 
            onClick={() => { setHasAccepted(true); setShowPopup(false); }}
            style={{ marginTop: '15px', padding: '10px 20px', background: '#4ba8a0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            I Understand
          </button>
        </PopUp>

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSearch={handleSearchWithPopup}
          onFontSizeChange={(size) => {
            document.documentElement.style.fontSize = size
          }}
        />

        {loading && <p style={{textAlign: 'center', marginTop: '20px'}}>Loading weather data...</p>}
        {error && <p style={{textAlign: 'center', color: '#d9534f'}}>{error}</p>}

        {/* Dashboard */}
        <Dashboard
          currentWeather={currentWeather}
          forecastData={forecastData}
          tidalHeight={currentTidalValue}
          fullTidalData={tidalHeight}
          windspeed={windspeed}
          gustspeed={gustspeed}
          visibility={visibility}
          
          onSearch={handleSearchWithPopup} 
          onMenuOpen={handleSidebarWithPopup} 
          
          onMapOpen={() => setPage('map')}
          BackToHome={handleHomePage}
        />
      </div>
    );
  }
}
export default App;

