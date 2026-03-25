const API_KEY = 'ee4776e6d3ed2ee744ace4b628bc7312'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function fetchCurrentWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch current weather')
  }

  return response.json()
}

export async function fetchForecast(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch forecast')
  }

  return response.json()
}