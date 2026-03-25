export async function fetchTidalData(lat, lon) {
  const res = await fetch(
    `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=sea_level_height_msl`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch tidal data')
  }

  const data = await res.json()
  console.log('MARINE DATA:', data)

  return data.hourly?.sea_level_height_msl?.[0] ?? null
}