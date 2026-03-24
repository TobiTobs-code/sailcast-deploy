import './App.css'
import WeatherMetrics from './components/WeatherMetrics'

function App() {
  return (
    <div style={{ padding: '20px', background: '#f0ece4', minHeight: '100vh' }}>
      <WeatherMetrics
        windSpeedKt={12}
        windGustKt={22}
        windDirLabel="SW"
        windDeg={225}
        waveHeight={1.3}
      />
    </div>
  )
}

export default App