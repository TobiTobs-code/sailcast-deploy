import { useRef, useEffect, useState } from 'react'
import './css/MapPage.css'

export default function MapPage({ windyUrl, locationName, onBack }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 🔥 Autoplay when entering map page
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // some browsers block autoplay — no crash
        })
    }
  }, [])

  const toggleXO = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="mapPage">

      {/* 🎵 AUDIO */}
      <audio ref={audioRef} src="/XO.mp3" />

      {/* Header */}
      <div className="mapPageHeader">

        {/* Back */}
        <button className="mapPageBack" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
          Back to Dashboard
        </button>

        {/* Title */}
        <span className="mapPageTitle">
          🌊 Wind Map
          {locationName && (
            <span className="mapPageLocation"> — {locationName}</span>
          )}
        </span>

        {/* 🎵 Music control */}
        <button className="mapPageMusicBtn" onClick={toggleXO}>
          {isPlaying ? 'Pause XO ' : 'Play XO '}
        </button>
      </div>

      {/* Map */}
      {windyUrl ? (
        <iframe
          src={windyUrl}
          className="mapPageIframe"
          title="Windy wind map"
          allowFullScreen
        />
      ) : (
        <div className="mapPageEmpty">
          <p>Search for a coastal location first</p>
          <button onClick={onBack}>Go back</button>
        </div>
      )}
    </div>
  )
}