# SailCast 
This is a coastal weather app for sailors(Mainly recreational sailors). The app allows the user to search any Coastal Location to get the live wind information e.g gust & speed, tidal height, weekly forecasts and a Safety Status card for sailing conditions.

## App Features
-Live weather data/forecast for any coastal location
-Interactive Windy map
-Assessiblity options
-Wind,temperature and Percipitation graphs
-Safety Status card - Switches between safe,caution and Unsafe based on the weather forecasts using wind gust/speed, tidal height & visibility.
-7-day weather forecasts
-Favourite locations can be saved and accessed via Sidebar menu

## Starting

### Prerequisites
-Node.js is installed on your system
-An Open Weather API key - available on https://openweathermap.org/api

### Installation Process
1. Clone the repository:
''bash
  git clone https://github.com/yourusername/sailcast.git
  cd sailcastv0
''

2. Install dependencies
''bash
  npm install
''

3. Create a js file and paste in the root foleder and add your generated API key:
'' 
    WEATHER_API_KEY = api_key_here

### Running the App
''bash
  npm run dev
''

Then open the link in the terminal which is usually http://localhost:5173/ in your browser

## Teck Stack
- React + Vite
- OpenWeatherApp API - weather forecast
- Windy Embed API - windy map
- Open-Meteo API - tidal height data
- CSS

## Project Structure
src/
├── api/
│   ├── weather.js       # OpenWeatherMap API calls
│   └── marine.js        # Tidal data API calls
├── components/
│   ├── Dashboard.jsx    # Main dashboard layout
│   ├── SafetyStatus.jsx # Safety Status card
│   ├── WeatherGraph.jsx # Wind/temp/precipitation graphs
│   ├── WeatherMetrics.jsx # Wind speed, gust, direction
│   ├── WeekForecast.jsx # 7-day forecasts from API
│   ├── Sidebar.jsx      # Slide-in - menu
│   ├── SavedLocations.jsx
│   ├── Accessibility.jsx
│   └── MapPage.jsx      # Full screen Windy map(Wind map)
├── App.jsx
├── App.css
└── main.jsx


