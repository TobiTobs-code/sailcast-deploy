import React, { useEffect, useState } from 'react'
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
  const [city, setCity] = useState('Białystok')
  const [selectedDate, setSelectedDate] = useState(null)
  const [xoBursts, setXoBursts] = useState([])
  const [motivationMessage, setMotivationMessage] = useState('')

  const now = new Date()
  const showTestMessageByDate =
    now.getFullYear() === 2026 &&
    now.getMonth() === 3 &&
    (now.getDate() === 15 || now.getDate() === 16)

  useEffect(() => {
    if (showTestMessageByDate) {
      setMotivationMessage('good luck with your test babe')
    }
  }, [showTestMessageByDate])

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

  const timezoneOffset = currentWeather?.timezone ?? 0

  const localDateTime = currentWeather?.dt
    ? new Date((currentWeather.dt + timezoneOffset) * 1000)
    : null

  const formattedLocalTime = localDateTime
    ? new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      }).format(localDateTime)
    : '--:--'

  const formattedLocalDate = localDateTime
    ? new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      }).format(localDateTime)
    : ''

  return (
    <div className="dashboard">
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 9999
        }}
      >
        {xoBursts.map((item) => (
          <span
            key={item.id}
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#e11d48',
              opacity: 0,
              textShadow: '0 2px 10px rgba(225, 29, 72, 0.22)',
              animation: `floatXO 4s ease forwards`,
              animationDelay: item.delay,
              willChange: 'transform, opacity'
            }}
          >
            XO
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes floatXO {
            0% {
              opacity: 0;
              transform: translate3d(0, 10px, 0) scale(0.85);
            }
            15% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate3d(0, -70px, 0) scale(1.08);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          margin: '10px 0 16px 0'
        }}
      >
        <div style={{ minHeight: '28px' }}>
          {motivationMessage && (
            <p
              style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: 600,
                color: '#111',
                letterSpacing: '0.2px',
                animation: 'fadeInUp 0.35s ease'
              }}
            >
              {motivationMessage}
            </p>
          )}
        </div>

        <button
          onClick={handleMotivationClick}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderRadius: '999px',
            background: '#ffffff',
            color: '#222',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
          }}
        >
          Tap for motivation 😝
        </button>
      </div>

      {/* SEARCH BAR */}
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
              <h3>{formattedLocalTime}</h3>
              <p>{formattedLocalDate}</p>
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