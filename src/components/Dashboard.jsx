import React from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'

export default function Dashboard({
  currentWeather,
  forecastData,
  tidalHeight,
  windspeed,
  gustspeed,
  visibility
}) {
  return (
    <div className="dashboard">

      {/* Top: Current weather card */}
      <div className="weather-card">
        <h2>{Math.round(currentWeather.main.temp)}°C</h2>
        <p>{currentWeather.name}</p>
      </div>

      {/* Middle row: Graph + Forecast side by side */}
      <div className="dashboard-row">
        <WeatherGraph forecastData={forecastData} />
        <WeekForecast forecastData={forecastData} />
      </div>

      {/* Tidal info below the middle row */}
      <p className="tidal-info">
        Tidal Height: {tidalHeight !== null ? `${tidalHeight} m` : 'Not available'}
      </p>

      {/* Bottom: Safety status (centered) */}
      <div className="safety-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        <SafetyStatus
          windspeed={windspeed}
          gustspeed={gustspeed}
          visibility={visibility}
        />
      </div>

    </div>
  )
}