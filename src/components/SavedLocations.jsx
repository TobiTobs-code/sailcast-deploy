// Saved locations — stores up to 3 locations in localStorage
// Clicking a location loads its weather via onSearch prop
import { useState, useEffect } from 'react';
import './css/SavedLocations.css';

export default function SavedLocations({ onSearch }) {

  // Load saved locations from localStorage on startup
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('sailcast-locations')
    return saved ? JSON.parse(saved) : []
  })

  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  // Save to localStorage whenever locations change
  useEffect(() => {
    localStorage.setItem('sailcast-locations', JSON.stringify(locations))
  }, [locations])

  // Add a new location
  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    if (locations.length >= 3) {
      setError('Maximum 3 locations — remove one first')
      return
    }
    if (locations.includes(trimmed)) {
      setError('Location already saved')
      return
    }

    setLocations([...locations, trimmed])
    setInput('')
    setError('')
  }

  // Remove a location
  const handleRemove = (location) => {
    setLocations(locations.filter(l => l !== location))
    setError('')
  }

  return (
    <div className="savedLocations">

      {/* Add location input row */}
      <div className="savedLocationsInput">
        <input
          type="text"
          placeholder="Add a location..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="savedLocationField"
        />
        <button
          className="savedLocationAddBtn"
          onClick={handleAdd}
          disabled={locations.length >= 3}
        >
          +
        </button>
      </div>

      {/* Error message */}
      {error && <p className="savedLocationError">{error}</p>}

      {/* Location list */}
      {locations.length === 0 ? (
        <p className="savedLocationEmpty">No saved locations yet</p>
      ) : (
        <ul className="savedLocationList">
          {locations.map((loc) => (
            <li key={loc} className="savedLocationItem">
              {/* Click location name to load its weather */}
              <button
                className="savedLocationName"
                onClick={() => onSearch(loc)}
              >
                📍 {loc}
              </button>
              {/* X button to remove */}
              <button
                className="savedLocationRemove"
                onClick={() => handleRemove(loc)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Location count */}
      <p className="savedLocationCount">{locations.length}/3 locations saved</p>

    </div>
  )
}