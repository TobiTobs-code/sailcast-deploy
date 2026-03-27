import { useState } from 'react'
import './App.css'
import SafetyStatus from './components/SafetyStatus'
import WeatherGraph from './components/WeatherGraph'
import WeekForecast from './components/WeekForecast'
import { fetchCurrentWeather, fetchForecast } from './api/weather'
import { fetchTidalData } from './api/marine'

function App() {
  const [city, setCity] = useState('')
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [tidalHeight, setTidalHeight] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch() {
    if (!city.trim()) {
      setError('Enter a city')
      return
    }

    setLoading(true)
    setError('')

    try {
      const current = await fetchCurrentWeather(city)
      const forecast = await fetchForecast(city)

      setCurrentWeather(current)
      setForecastData(forecast)

      const lat = current.coord.lat
      const lon = current.coord.lon

      const tidal = await fetchTidalData(lat, lon)
      setTidalHeight(tidal)
    } catch (err) {
      setError(err.message)
      setCurrentWeather(null)
      setForecastData(null)
      setTidalHeight(null)
    } finally {
      setLoading(false)
    }
  }

  const windspeed = currentWeather ? Math.round(currentWeather.wind.speed * 1.94384) : 0
  const gustspeed =
    currentWeather?.wind?.gust != null
      ? Math.round(currentWeather.wind.gust * 1.94384)
      : windspeed
  const visibility =
    currentWeather?.visibility != null
      ? currentWeather.visibility / 1000
      : 0

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {currentWeather && (
        <SafetyStatus
          windspeed={windspeed}
          gustspeed={gustspeed}
          visibility={visibility}
          tidalHeight={tidalHeight}
        />
      )}

      {currentWeather && (
        <p>
          Tidal Height: {tidalHeight !== null ? `${tidalHeight} m` : 'Not available for this location'}
        </p>
      )}

      {forecastData && <WeekForecast forecastData={forecastData} />}
      {forecastData && <WeatherGraph forecastData={forecastData} />}
    </div>
  )
}

export default App