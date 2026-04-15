import React, { useState } from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'
import WeatherMetrics from './WeatherMetrics'
import boatIcon from './assets/icons8-boat-64.svg';
import './css/Dashboard.css'

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
  const [motivation, setMotivation] = useState('')
  const [xoBursts, setXoBursts] = useState([])

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

  // 📅 DATE LOGIC
  const today = new Date()
  const isTestDay =
    today.getFullYear() === 2026 &&
    today.getMonth() === 3 && // April = 3
    today.getDate() === 16

  // 🎯 MESSAGES
  const showMotivation = () => {
    const msgs = [
      "good luck with your test babe",
      "you’ve got this doc 👩🏾‍⚕️"
    ]

    const msg = msgs[Math.floor(Math.random() * msgs.length)]
    setMotivation(msg)

    // CLEAN XO POSITIONS
    const positions = [
      { left: '25%', top: '30%' },
      { left: '50%', top: '20%' },
      { left: '75%', top: '35%' },
      { left: '30%', top: '60%' },
      { left: '60%', top: '65%' }
    ]

    const burst = positions.map((pos, i) => ({
      id: Date.now() + i,
      left: pos.left,
      top: pos.top
    }))

    setXoBursts(burst)

    setTimeout(() => {
      setXoBursts([])
    }, 4000)
  }

  return (
    <div className="dashboard">

      {/* XO ANIMATION */}
      {xoBursts.map((item) => (
        <span
          key={item.id}
          className="xo-burst"
          style={{
            left: item.left,
            top: item.top
          }}
        >
          XO
        </span>
      ))}

      <div className="dashboard-header">
        <h1
          className="dashboard-title"
          onClick={BackToHome}
        >
          <img src={boatIcon} alt="icon" />
          SailCast
        </h1>

        <h2 className="dashboard-tagline">
          Weather just for Jojo ❤️
        </h2>

        {isTestDay && (
          <p className="test-message">
            Good luck with your test babe
          </p>
        )}
      </div>

      {/* MOTIVATION */}
      <div className="jojo-motivation-wrap">
        <button className="motivation-button" onClick={showMotivation}>
          Tap for motivation ❤️
        </button>

        {motivation && (
          <p className="motivation-message">{motivation}</p>
        )}
      </div>

      {/* SEARCH */}
      <div className="searchBar">
        <button className="hamburgerBtn" onClick={onMenuOpen}>
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
        </button>

        <button className="mapBtn" onClick={onMapOpen}>
          🌍
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
          <h2>{Math.round(currentWeather?.main?.temp ?? 0)}°C</h2>
          <p>{currentWeather?.name}</p>
        </div>
      )}
    </div>
  )
}