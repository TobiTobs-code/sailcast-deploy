// Accessibility settings — text size and experience level
// Settings saved to localStorage and persist between sessions
import { useState, useEffect } from 'react'
import './css/Accessibility.css'

// Font size options matching experience levels
const FONT_SIZES = {
  beginner:     '18px',
  intermediate: '16px',
  advanced:     '13px',
}

export default function Accessibility({ onFontSizeChange }) {

  // Load saved preferences from localStorage
  const [experience, setExperience] = useState(() => {
    return localStorage.getItem('sailcast-experience') || 'intermediate'
  })

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('sailcast-fontsize') || 'medium'
  })

  // Apply font size to whole page whenever it changes
  useEffect(() => {
    const size = FONT_SIZES[experience]
    document.documentElement.style.fontSize = size
    onFontSizeChange(size)
  }, [experience])

  // Save experience to localStorage when it changes
  const handleExperienceChange = (level) => {
    setExperience(level)
    localStorage.setItem('sailcast-experience', level)
  }

  return (
    <div className="accessibility">

      {/* Experience level */}
      <div className="accessibilityGroup">
        <p className="accessibilityLabel">Experience Level</p>
        <p className="accessibilityHint">Adjusts text size across the app</p>

        {/* Three option buttons */}
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            className={`experienceBtn ${experience === level ? 'experienceBtnActive' : ''}`}
            onClick={() => handleExperienceChange(level)}
          >
            <span className="experienceBtnLabel">
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
            <span className="experienceBtnDesc">
              {level === 'beginner' && 'Large text, detailed guidance'}
              {level === 'intermediate' && 'Standard text, key info'}
              {level === 'advanced' && 'Compact text, data dense'}
            </span>
            {experience === level && <span className="experienceBtnTick">✓</span>}
          </button>
        ))}
      </div>

      {/* Current font size indicator */}
      <p className="accessibilityFooter">
        Current text size: {FONT_SIZES[experience]}
      </p>

    </div>
  )
}