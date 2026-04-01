import React, { useState } from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'
import WeatherMetrics from './WeatherMetrics'
import boatIcon from './assets/icons8-boat-64.svg';
import './css/Dashboard.css'

// Main dashboard component displaying current weather, forecast, and safety status
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
  onMapOpen,
  BackToHome
}) {
  const [city, setCity] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  const getWindDirLabel = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW']
    return dirs[Math.round(deg / 45) % 8]
  }

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(city)
      setSelectedDate(null) 
    }
  }

  // Dashboard layout with header, search bar, current weather card, 
 //and main content area for metrics and forecast
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1 className="dashboard-title"
          onClick={BackToHome}
          style={{
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            fontFamily: "'Cedarville Cursive', cursive", // <-- Cedarville Cursive applied!
            fontSize: '2.5rem',
            margin: '0'
          }}>
          <img src={boatIcon} alt="SailCast Icon" style={{ width: '40px', height: '40px' }} /> 
          SailCast
        </h1>
      </div>
     

      {/* SEARCH BAR */}
      {/* The search bar includes a hamburger menu button, a map button, an input field for city name, and a search button.*/}
      <div className="searchBar">
        <button className="hamburgerBtn" onClick={onMenuOpen}>
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
        </button>
        <button className="mapBtn" onClick={onMapOpen} title="View wind map">
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

      {currentWeather && (
        <div className="weather-card">
          <div className="weather-card-top">
            <div className="weather-card-left">
              <h2>{Math.round(currentWeather?.main?.temp ?? 0)}°C</h2>
              <p>{currentWeather?.name}</p>
            </div>
            <div className="weather-card-right">
              <h3>{new Date(currentWeather?.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
              <p>{new Date(currentWeather?.dt * 1000).toLocaleDateString([], 
                {weekday:'long', day: 'numeric', month: 'long', year: 'numeric'})}</p>
            </div>
          </div>
        </div>
      )}

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
                  forecastData={forecastData} 
                  marineData={fullTidalData}
                  selectedDate={selectedDate}
                />
              </div>

              <div className="forecast-week">
                <WeekForecast 
                  forecastData={forecastData} 
                  selectedDate={selectedDate}
                  onSelectDay={(dateStr) => setSelectedDate(dateStr)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Tidal Height text explicitly removed from here! */}
    </div>
  )
}