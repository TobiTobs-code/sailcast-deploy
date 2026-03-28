import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { fetchCurrentWeather, fetchForecast } from './api/weather';
import { fetchTidalData } from './api/marine';

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [tidalHeight, setTidalHeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      const tidal = await fetchTidalData(lat, lon);
      setTidalHeight(tidal);
      setCity(searchCity); // update city state
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecastData(null);
      setTidalHeight(null);
    } finally {
      setLoading(false);
    }
  }

  const windspeed = currentWeather ? Math.round(currentWeather.wind.speed * 1.94384) : 0;
  const gustspeed =
    currentWeather?.wind?.gust != null
      ? Math.round(currentWeather.wind.gust * 1.94384)
      : windspeed;
  const visibility =
    currentWeather?.visibility != null
      ? currentWeather.visibility / 1000
      : 0;

  return (
    <div className="app">
  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}

  {/* Dashboard always visible */}
  <Dashboard
    currentWeather={currentWeather}
    forecastData={forecastData}
    tidalHeight={tidalHeight}
    windspeed={windspeed}
    gustspeed={gustspeed}
    visibility={visibility}
    onSearch={handleSearch}
  />
</div>
  );
}

export default App;
