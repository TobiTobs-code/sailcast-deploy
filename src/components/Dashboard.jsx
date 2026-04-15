import React, { useEffect, useRef, useState } from 'react'
import SafetyStatus from './SafetyStatus'
import WeatherGraph from './WeatherGraph'
import WeekForecast from './WeekForecast'
import WeatherMetrics from './WeatherMetrics'
import boatIcon from './assets/icons8-boat-64.svg'
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
  const [city, setCity] = useState('Białystok')
  const [selectedDate, setSelectedDate] = useState(null)
  const [motivationMessage, setMotivationMessage] = useState('')
  const [xoActive, setXoActive] = useState(false)

  const hasLoadedDefaultCity = useRef(false)

  useEffect(() => {
    const now = new Date()
    const isTestPeriod =
      now.getFullYear() === 2026 &&
      now.getMonth() === 3 &&
      (now.getDate() === 15 || now.getDate() === 16)

    if (isTestPeriod) {
      setMotivationMessage('good luck with your test babe')
    }
  }, [])

  useEffect(() => {
    if (!onSearch || hasLoadedDefaultCity.current) return

    hasLoadedDefaultCity.current = true
    onSearch('Białystok')
  }, [onSearch])

  const handleSearchClick = () => {
    const searchedCity = city.trim()

    if (!searchedCity || !onSearch) return

    onSearch(searchedCity)
    setSelectedDate(null)
  }

  const handleMotivationClick = () => {
    setMotivationMessage((prev) =>
      prev === 'good luck with your test babe'
        ? "you've got this doc 👩🏾‍⚕️"
        : 'good luck with your test babe'
    )

    setXoActive(false)

    setTimeout(() => {
      setXoActive(true)
    }, 20)

    setTimeout(() => {
      setXoActive(false)
    }, 2600)
  }

  const getWindDirLabel = (deg) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return dirs[Math.round(deg / 45) % 8]
  }

  const getCityDateTime = () => {
    if (currentWeather?.timezone === undefined) {
      return {
        time: '--:--',
        date: ''
      }
    }

    const cityMs = Date.now() + currentWeather.timezone * 1000
    const cityDate = new Date(cityMs)

    return {
      time: cityDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      }),
      date: cityDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })
    }
  }

  const { time: localTime, date: localDate } = getCityDateTime()

  return (
    <div className="dashboard">
      {xoActive && (
        <div className="jojo-xo-layer">
          <span className="jojo-xo xo-1">XO</span>
          <span className="jojo-xo xo-2">XO</span>
          <span className="jojo-xo xo-3">XO</span>
          <span className="jojo-xo xo-4">XO</span>
          <span className="jojo-xo xo-5">XO</span>
          <span className="jojo-xo xo-6">XO</span>
          <span className="jojo-xo xo-7">XO</span>
          <span className="jojo-xo xo-8">XO</span>
          <span className="jojo-heart heart-1">❤️</span>
          <span className="jojo-heart heart-2">💋</span>
          <span className="jojo-heart heart-3">❤️</span>
        </div>
      )}

      <div className="dashboard-header">
        <h1 className="dashboard-title" onClick={BackToHome}>
          <img
            src={boatIcon}
            alt="SailCast Icon"
            style={{ width: '40px', height: '40px' }}
          />
          SailCast
        </h1>

        <h2 className="dashboard-tagline">
          Weather just for Jojo ❤️
        </h2>
      </div>

      <div className="jojo-motivation-wrap">
        <div className="motivation-message-slot">
          {motivationMessage && (
            <p className="motivation-message">{motivationMessage}</p>
          )}
        </div>

        <button className="motivation-button" onClick={handleMotivationClick}>
          Tap for motivation 😝
        </button>
      </div>

      <div className="searchBar">
        <button className="hamburgerBtn" onClick={onMenuOpen}>
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
          <span className="hamburgerLine" />
        </button>

        <button className="mapBtn" onClick={onMapOpen} title="View wind map">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
            <path d="M15 5.764v15" />
            <path d="M9 3.236v15" />
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
              <h3>{localTime}</h3>
              <p>{localDate}</p>
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
    </div>
  )
}