
import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MapPage from './components/MapPage';
import { fetchCurrentWeather, fetchForecast } from './api/weather';
import { fetchTidalData } from './api/marine';
import boatIcon from './components/assets/icons8-boat-64.svg';

const windyurl = 'https://embed.windy.com/embed2.html?lat=50.9&lon=-1.5&zoom=7&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&metricWind=kt&metricTemp=°C&radarRange=-1';

function App() {
  const [City, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [tidalHeight, setTidalHeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windyUrl, setWindyUrl] = useState('');
  const [page, setPage] = useState('home');

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

      // Isolating the tidal data fetch
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
      setPage('dashboard'); // Ensure we return to the dashboard after a search
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

   if (page === 'home') {
    return (
      <div className="app">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSearch={handleSearch}
          onFontSizeChange={(size) => { document.documentElement.style.fontSize = size; }}
          onBackToMap={handleHomePage}
        />

        <div className="header"> 
          <h1 
            className="app-title" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
          >
            <img src={boatIcon} alt="SailCast Icon" style={{ width: '36px', height: '36px' }} />
            SailCast
          </h1>
        </div>

        {/* Search bar */}
        <div className="searchBar">
          <button className="hamburgerBtn" onClick={() => setSidebarOpen(true)}>
            <span className="hamburgerLine" />
            <span className="hamburgerLine" />
            <span className="hamburgerLine" />
          </button>
          <input
            type="text"
            placeholder="Enter city"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(City)}
          />
          <button onClick={() => handleSearch(City)}>Search</button>
        </div>

        


        {/* Tagline */}
        <p className="empty-state-tagline">
          
        </p>

       
        <div className="home-map-container">
          <iframe
            src={windyurl}
            className="home-map-iframe"
            title="Wind map"
            allowFullScreen
          />
        </div>

        <div className="popular-coast-locations">
          <p className = "Featured-locations-label">Featured Locations</p>
          {['Brighton', 'Portsmouth', 'Plymouth', 'Bristol', 'Newquay'].map((loc) => (
              <button 
                key={loc} 
                className="popular-location-btn" 
                onClick={() => handleSearch(loc)}>
                {loc}
              </button>
            ))}
        </div>
      </div>
    );
  }
if(page === 'dashboard') {
  return (
    <div className="app">

      {/* Sidebar — slides in from left */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSearch={handleSearch}
        onFontSizeChange={(size) => {
          document.documentElement.style.fontSize = size
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Dashboard always visible */}
      <Dashboard
        currentWeather={currentWeather}
        forecastData={forecastData}
        tidalHeight={currentTidalValue}
        fullTidalData={tidalHeight}
        windspeed={windspeed}
        gustspeed={gustspeed}
        visibility={visibility}
        onSearch={handleSearch}
        onMenuOpen= {() => setSidebarOpen(true)}
        onMapOpen={() => setPage('map')}
        BackToHome={handleHomePage}
      />
    </div>
  );
}
}
export default App;

