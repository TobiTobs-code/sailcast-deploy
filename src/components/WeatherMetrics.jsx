//the wind/gust/direction/tide grid
import './css/WeatherMetrics.css';

export default function WeatherMetrics({ 
  windSpeedKt, 
  windGustKt, 
  windDirLabel, 
  windDeg,
  waveHeight
}) {

  // ── Beaufort scale calculation ────────────────────────────────
  const getBeaufort = (kt) => {
    if (kt < 1)  return 0
    if (kt < 4)  return 1
    if (kt < 7)  return 2
    if (kt < 11) return 3
    if (kt < 17) return 4
    if (kt < 22) return 5
    if (kt < 28) return 6
    if (kt < 34) return 7
    if (kt < 41) return 8
    if (kt < 48) return 9
    if (kt < 56) return 10
    if (kt < 64) return 11
    return 12
  }

  // ── Last updated time ─────────────────────────────────────────
  // Shows the current time as the last updated timestamp
  const now = new Date()
  const lastUpdated = now.toLocaleTimeString("en-GB", { 
    hour: "2-digit", 
    minute: "2-digit" 
  })

  return (
    <div className="card">
      <div className="lastUpdated">
        {/* Clock icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>

        Last updated: {lastUpdated}
      </div>

      {/* 2x2 grid */}
      <div className="grid">

        {/* Wind Speed */}
        <div className="metric">
          <div className="metricTop">
            <span className="metricValue">{windSpeedKt}</span>
            <span className="metricUnit">kt</span>
          </div>
          {/* Label with wind icon */}
          <div className="metricLabel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ba8a0" strokeWidth="2">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/>
              <path d="M12.42 19.42A2 2 0 1 0 14 16H2"/>
              <path d="M17.73 8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
            Wind Speed
          </div>
        </div>

        {/* Gust */}
        <div className="metric">
          <div className="metricTop">
            <span className="metricValue">{windGustKt}</span>
            <span className="metricUnit">kt</span>
          </div>
          {/* Label with gust icon + Beaufort force */}
          <div className="metricLabel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ba8a0" strokeWidth="2">
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
            </svg>
            Gust Info
            {/* Beaufort force shown next to label */}
            <span className="beaufortLabel">
              · F{getBeaufort(windGustKt)}
            </span>
          </div>
        </div>

        {/* Wind Direction */}
        <div className="metric">
          <div className="metricTop">
            <span className="directionValue">{windDirLabel}</span>
            {/* Arrow rotates to match wind direction degrees */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2d7a74"
              strokeWidth="2"
              style={{ 
                marginLeft: '4px',
                marginBottom: '2px',
                transform: `rotate(${windDeg}deg)`,
                transition: 'transform 0.4s ease'
              }}
            >
              <line x1="12" y1="20" x2="12" y2="4"/>
              <polyline points="5,11 12,4 19,11"/>
            </svg>
          </div>
          {/* Label with compass icon */}
          <div className="metricLabel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ba8a0" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
            </svg>
            Wind Direction
          </div>
        </div>

        {/* Wave Height */}
        <div className="metric">
          <div className="metricTop">
            <span className="metricValue">{waveHeight}</span>
            <span className="metricUnit">m</span>
          </div>
          {/* Label with wave icon */}
          <div className="metricLabel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ba8a0" strokeWidth="2">
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>
            </svg>
            Wave Height
          </div>
        </div>

      </div>
    </div>
  )
}