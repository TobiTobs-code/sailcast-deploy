//the safety scoring card
import React from 'react';
/**
 * This component calculates the safety status based on the wind speed, gust speed, and visibility. 
 * It uses a simple scoring system to determine whether the conditions are safe, cautionary, or unsafe for sailing. 
 * The scores are based on predefined thresholds for each parameter, and the final safety status is 
 * determined by the total score.
 * Wind speed (knots):
 * Wind gust (knots):
 * Visibility (km):
 */

function getSafetyStatus({windspeed, gustspeed, visibility}) {
    let weatherscore = 0;

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
    } else if(gustspeed > 20 && gustspeed <= 30) { //caution
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
    } else if(visibility >= 1) { //caution
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
    }
}

// The main component that renders the safety status card on the screen. It takes the weather information 
//  and uses the getSafetyStatus function to determine the safety status. The card is styled based on the 
// status and displays a message to the user.
export default function SafetyStatus({windspeed, gustspeed, visibility}) {
    const safetyStatus = getSafetyStatus({windspeed, gustspeed, visibility});
    const st = STATUS[safetyStatus];
    
    return(
        <div className={`safety-status-card ${st.className}`}>
           <div className = "st-label" style={{color: st.labelcolor}}>
                <span className="st-dot" style={{backgroundColor: st.dot}}></span>
                <p className = "st-title">Safety Status</p>
           </div>
           <p className = "st-word">{st.label}</p>
           <p className="st-message">{st.message}</p>
        </div>
    )


}