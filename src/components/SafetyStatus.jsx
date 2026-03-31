import React, { useState } from 'react';
import './css/SafetyStatus.css';

/**
 * This component calculates the safety status based on the wind speed, gust speed, and visibility. 
 * It uses a simple scoring system to determine whether the conditions are safe, cautionary, or unsafe for sailing. 
 * The scores are based on predefined thresholds for each parameter, and the final safety status is 
 * determined by the total score.
 * Wind speed (knots):
 * Wind gust (knots):
 * Visibility (km):
 */

export function getSafetyStatus({windspeed, gustspeed, visibility, tidalHeight}) {
    let weatherscore = 0;

    if(tidalHeight == null) {
        return 'NotCoastal'; //Return NotCoastal if any of the parameters are null
    }

    //Wind speed(knots) scoring
    if(windspeed <= 15) { //safe
        weatherscore += 1;
    } else if(windspeed > 15 && windspeed <= 30) { //caution
        weatherscore += 0;
    }
    else { //unsafe
        weatherscore -= 1;
    }

    //Wind gust(knots) scoring
    if(gustspeed <= 20) { //safe
        weatherscore += 1;
    } 
    else if(gustspeed > 20 && gustspeed <= 30) { //caution
        weatherscore += 0;
    }
    else { //unsafe
        weatherscore -= 1;
    }

    if(windspeed > 30 || gustspeed > 30 || visibility < 1) {
        weatherscore = -1; // Override to unsafe if any condition is in the unsafe range
    }
    
    //Visibility scoring
    if(visibility >= 5) { //safe
        weatherscore += 1;
    } 
    else if(visibility >= 1) { //caution
        weatherscore += 0;
    }
    else { //unsafe
        weatherscore -= 1;
    }

    //tidal height scoring
    if(tidalHeight < 0.5) { //safe
        weatherscore += 1;
    } else if(tidalHeight >= 0.5 && tidalHeight <= 2) { //caution
        weatherscore += 0;
    }
    else { //unsafe
        weatherscore -= 1;
    }

    if(weatherscore >= 2) {
        return 'Safe';
    } 
    else if(weatherscore >= 0) {
        return 'Caution';
    }
    else {
        return 'Unsafe';
    }

   
}

// Returns a label and score explanation for each metric
// Used in the info breakdown panel
function getBreakdown(windspeed, gustspeed, visibility, tidalHeight) {
    return [
        {
            label: 'Wind Speed',
            value: `${windspeed} kt`,
            result: windspeed <= 15 ? 'Safe (≤15 kt)' : windspeed <= 30 ? 'Caution (16–30 kt)' : 'Unsafe (>30 kt)'
        },
        {
            label: 'Gust Speed',
            value: `${gustspeed} kt`,
            result: gustspeed <= 20 ? 'Safe (≤20 kt)' : gustspeed <= 30 ? 'Caution (21–30 kt)' : 'Unsafe (>30 kt)'
        },
        {
            label: 'Visibility',
            value: `${visibility} km`,
            result: visibility >= 5 ? 'Safe (≥5 km)' : visibility >= 1 ? 'Caution (1–5 km)' : 'Unsafe (<1 km)'
        },
        {
            label: 'Wave Height',
            value: tidalHeight != null ? `${tidalHeight} m` : 'N/A',
            result: tidalHeight == null ? 'Not coastal' : tidalHeight < 0.5 ? 'Safe (<0.5 m)' : tidalHeight <= 2 ? 'Caution (0.5–2 m)' : 'Unsafe (>2 m)'
        },
    ]
}

// This defines the status messages and styles for each safety status
 const STATUS = {
        Safe: {
            label : 'safe',
            message:
            "Based on the current weather conditions, it is safe to sail. The wind speed, gust speed, and visibility are all within acceptable limits. Always remember to check the weather forecast before heading out and stay informed about any changes in conditions.",
            bordercolor : "#5cb85c",
            labelcolor : "#3a7a3a",
            dot: '#4c9e4c',
            backgroundcolor: "rgba(92, 184, 92, 0.08)",
            className: 'safe-status',
        },
        Caution: {
            label : 'Caution',
            message:
            "Based on the current weather conditions, it is advisable to exercise caution when sailing. The wind speed, gust speed, or visibility may be approaching limits that could affect safety. It is recommended to monitor the weather closely and be prepared for changing conditions.",
            bordercolor : "#e6a817",
            labelcolor : "#c3861c",
            dot: "#e6a817",
            backgroundcolor: 'rgba(230, 165, 23, 0.08)',
            className: 'caution-status',


        },
        Unsafe: {
            label : 'Unsafe',
            message:
            "Based on the current weather conditions, it is unsafe to sail. The wind speed, gust speed, or visibility are likely to be at levels that could pose significant risks. It is strongly recommended to avoid sailing and seek shelter until conditions improve.",
            bordercolor : "#d9534f",
            labelcolor : "#a94442",
            dot: "#d9534f",
            backgroundcolor: 'rgba(217, 83, 79, 0.08)',
            className: 'unsafe-status',
    },
        NotCoastal : {
            label : 'Not Coastal',
            message:
            "Safety status is only available for coastal locations. Suggestion: Try searching for a coastal location such as a UK harbour or marina to get safety status information.",
            bordercolor : "#6c757d",
            labelcolor : "#5a6268",
            dot: "#6c757d",
            backgroundcolor: 'rgba(99, 105, 109, 0.08)',
            className: 'notcoastal-status',
        }
}

// The main component that renders the safety status card on the screen. It takes the weather information 
//  and uses the getSafetyStatus function to determine the safety status. The card is styled based on the 
// status and displays a message to the user.
export default function SafetyStatus({windspeed, gustspeed, visibility, tidalHeight}) {
    const safetyStatus = getSafetyStatus({windspeed, gustspeed, visibility, tidalHeight});
    const st = STATUS[safetyStatus];

    const [showInfo, setShowInfo] = useState(false)
    const breakdown = getBreakdown(windspeed, gustspeed, visibility, tidalHeight)

    
    return(
        <div className={`safety-status-card ${st.className}`}>
           <div className = "st-label" style={{color: st.labelcolor}}>
                <span className="st-dot" style={{backgroundColor: st.dot}}></span>
                <p className = "st-title">Safety Status</p>
                <span className="st-word">{st.label}</span>
                {/* Info icon button — toggles breakdown panel */}
                <button
                    className="st-info-btn"
                    onClick={() => setShowInfo(!showInfo)}
                    title="How is this calculated?"
                >
                    {/* Info icon*/}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                    </svg>
                </button>
           </div>

           {/* Safety message */}
           <p className="st-message">{st.message}</p>

           {/*Breakdown panel- only visible when info icon clicked*/}
           {showInfo && (
                <div className="st-breakdown">

                    {/* Panel title */}
                    <p className="st-breakdown-title">How this was calculated:</p>

                    {/* One row per metric */}
                    {breakdown.map((item, i) => (
                        <div key={i} className="st-breakdown-row">
                            <span className="st-breakdown-label">{item.label}</span>
                            <span className="st-breakdown-value">{item.value}</span>
                            <span className="st-breakdown-result">{item.result}</span>
                        </div>
                    ))}

                    {/* Scoring explanation */}
                    <p className="st-breakdown-note">
                        Each metric adds +1 (safe), 0 (caution), or -1 (unsafe) to the score.
                        Score ≥2 = Safe · Score ≥0 = Caution · Score &lt;0 = Unsafe.
                        Extreme conditions override to Unsafe regardless of score.
                    </p>
                </div>
            )}
        </div>
    )


}