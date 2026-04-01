// Accessibility settings — text size percentages
import { useState, useEffect } from 'react'
import './css/Accessibility.css'

// Font sizes matched to percentage levels
const FONT_SIZES = {
  '150%': '24px',
  '125%': '20px',
  '100%': '16px',
}

export default function Accessibility({ onFontSizeChange }) {

  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem('sailcast-textsize') || '100%'
  })

  useEffect(() => {
    const size = FONT_SIZES[textSize]
    document.documentElement.style.fontSize = size
    onFontSizeChange(size)
  }, [textSize])

  const handleTextSizeChange = (level) => {
    setTextSize(level)
    localStorage.setItem('sailcast-textsize', level)
  }

  return (
    <div className="accessibility">
      <div className="accessibilityGroup">
        <p className="accessibilityLabel">Text Size</p>
        <p className="accessibilityHint">Adjusts text size across the app</p>

        {['150%', '125%', '100%'].map((level) => (
          <button
            key={level}
            className={`experienceBtn ${textSize === level ? 'experienceBtnActive' : ''}`}
            onClick={() => handleTextSizeChange(level)}
          >
            <span className="experienceBtnLabel">{level}</span>
            <span className="experienceBtnDesc">
              {level === '150%' && 'Extra large text'}
              {level === '125%' && 'Large text'}
              {level === '100%' && 'Standard text'}
            </span>
            {textSize === level && <span className="experienceBtnTick">✓</span>}
          </button>
        ))}
      </div>

      <p className="accessibilityFooter">
        Current setting: {textSize}
      </p>
    </div>
  )
}