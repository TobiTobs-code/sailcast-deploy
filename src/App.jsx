import './App.css'
import SafetyStatus from './components/SafetyStatus'
/*import WeatherMetrics from './components/WeatherMetrics'
import WeatherGraph from './components/WeatherGraph'
import WeekForecast from './components/WeekForecast'
import Dashboard from './components/Dashboard'
*/
function App() {
    return (
      <>
        <SafetyStatus 
          windspeed={14}
          gustspeed={22}
          visibility={8}
        />
      </>
    )
  }
  

export default App
