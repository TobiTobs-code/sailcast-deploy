import React, { useEffect, useState } from 'react'
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
  const [city, setCity] = useState('Białystok')
  const [selectedDate, setSelectedDate] = useState(null)
  const [xoBursts, setXoBursts] = useState([])

  const now = new Date()
  const showTestMessageByDate =
    now.getFullYear() === 2026 &&
    now.getMonth() === 3 &&
    (now.getDate() === 15 || now.getDate() === 16)

  const [motivationMessage, setMotivationMessage] = useState(
    showTestMessageByDate ? 'good luck with your test babe' : ''
  )

  useEffect(() => {
    if (onSearch) {
      onSearch('Białystok')
    }
  }, [onSearch])

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

  const triggerXO = () => {
    const positions = [
      { left: '24%', top: '18%' },
      { left: '36%', top: '24%' },
      { left: '50%', top: '18%' },
      { left: '64%', top: '24%' },
      { left: '76%', top: '18%' },
      { left: '30%', top: '34%' },
      { left: '46%', top: '32%' },
      { left: '62%', top: '34%' }
    ]

    const burst = positions.map((pos, i) => ({
      id: Date.now() + i,
      left: pos.left,
      top: pos.top,
      delay: `${i * 0.08}s`
    }))

    setXoBursts(burst)

    setTimeout(() => {
      setXoBursts([])
    }, 4000)
  }

  const handleMotivationClick = () => {
    setMotivationMessage((prev) =>
      prev === 'good luck with your test babe'
        ? "you've got this doc 👩🏾‍⚕️"
        : 'good luck with your test babe'
    )
    triggerXO()
  }

  return (
    <div className="dashboard">
      {xoBursts.map((item) => (
        <span
          key={item.id}
          className="xo-burst"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay
          }}
        >
          XO
        </span>
      ))}

      <div
        className="dashboard-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <h1
          className="dashboard-title"
          onClick={BackToHome}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: '2.5rem',
            margin: '0'
          }}
        >
          <img src={boatIcon} alt="SailCast Icon" style={{ width: '40px', height: '40px' }} />
          SailCast
        </h1>

        <h2
          className="dashboard-tagline"
          style={{
            fontWeight: 500,
            fontFamily: "'Poppins', sans-serif",
            alignItems: 'center',
            fontSize: '0.8rem',
            marginTop: '30px',
            opacity: 0.7
          }}
        >
          Weather just for Jojo ❤️
        </h2>
      </div>

      <div className="jojo-motivation-wrap">
        {motivationMessage && (
          <p className="motivation-message">{motivationMessage}</p>
        )}
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
              <p>{new Date(currentWeather?.dt * 1000).toLocaleDateString([], {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</p>
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