import React, { useState } from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'
import WeatherMetrics from './WeatherMetrics'

//hamburger button to searchbar

export default function Dashboard({
  currentWeather,
  forecastData,
  tidalHeight,
  fullTidalData,
  windspeed,
  gustspeed,
  visibility,
  onSearch,
  onMenuOpen,
  onMapOpen
}) {
  const [city, setCity] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  const getWindDirLabel = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW']
    return dirs[Math.round(deg / 45) % 8]
  }

  const handleSearchClick = () => {
    if (onSearch){
      onSearch(city)
      setSelectedDate(null)
    }
  }

  return (
    <div className="dashboard">

      {/* SEARCH BAR always visible */}
      <div className="searchBar">
        {/* Hamburger button, opens sidebar */}
        <button className="hamburgerBtn" onClick={onMenuOpen}>
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
        </button>
        {/* Map button — opens Windy map */}
        <button className="mapBtn" onClick={onMapOpen} title="View wind map">
          {/* Map icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>
            <path d="M15 5.764v15"/>
            <path d="M9 3.236v15"/>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
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
              waveHeight={tidalHeight ?? 'N/A'}
            />

            <SafetyStatus
              windspeed={windspeed}
              gustspeed={gustspeed}
              visibility={visibility}
              tidalHeight={tidalHeight}
            />
          </div>

          <div className="right-panel">
            <div className="forecast-section">
              <div className="forecast-graph">
                <WeatherGraph
                  forecastData = {forecastData}
                  marineData = {fullTidalData}
                  selectedDate = {selectedDate}
                />
              </div>

              <div className="forecast-week">
                <WeekForecast
                  forecastData = {forecastData}
                  selectedDate={selectedDate}
                  onSelectDay= {(dateStr) => setSelectedDate(dateStr)}
                />
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
