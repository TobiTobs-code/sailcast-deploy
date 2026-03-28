import React, { useState } from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'
import WeatherMetrics from './WeatherMetrics'

export default function Dashboard({
  currentWeather,
  forecastData,
  tidalHeight,
  windspeed,
  gustspeed,
  visibility,
  onSearch
}) {
  const [city, setCity] = useState('')

  const getWindDirLabel = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW']
    return dirs[Math.round(deg / 45) % 8]
  }

  const handleSearchClick = () => {
    if (onSearch) onSearch(city)
  }

  return (
    <div className="dashboard">

      {/* SEARCH BAR always visible */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* Weather card only if data exists */}
      {currentWeather && (
        <div className="weather-card">
          <h2>{Math.round(currentWeather?.main?.temp ?? 0)}°C</h2>
          <p>{currentWeather?.name}</p>
        </div>
      )}

      {/* Main dashboard only if data exists */}
      {currentWeather && (
        <div className="dashboard-main">
          <div className="left-panel">
            <WeatherMetrics
              windSpeedKt={windspeed}
              windGustKt={gustspeed}
              windDirLabel={getWindDirLabel(currentWeather?.wind?.deg ?? 0)}
              windDeg={currentWeather?.wind?.deg ?? 0}
              waveHeight={tidalHeight ?? 0}
            />

            <SafetyStatus
              windspeed={windspeed}
              gustspeed={gustspeed}
              visibility={visibility}
            />
          </div>

          <div className="right-panel">
            <div className="forecast-section">
              <div className="forecast-graph">
                <WeatherGraph forecastData={forecastData} />
              </div>

              <div className="forecast-week">
                <WeekForecast forecastData={forecastData} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tidal info */}
      {currentWeather && (
        <p className="tidal-info">
          Tidal Height: {tidalHeight !== null ? `${tidalHeight} m` : 'Not available'}
        </p>
      )}

    </div>
  )
}
