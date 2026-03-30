import React from 'react';

// ADDED: selectedDate and onSelectDay props
export default function WeekForecast({ forecastData, selectedDate, onSelectDay }) {
    if (!forecastData?.list) return null;

    const byDay = {};
    forecastData.list.forEach((slot) => {
        const key = new Date(slot.dt * 1000).toISOString().slice(0, 10);
        if (!byDay[key]) byDay[key] = [];
        byDay[key].push(slot);
    });

    const days = Object.entries(byDay)
        .slice(0, 7)
        .map(([dateStr, slots]) => {
            const noon =
                slots.find((s) => {
                    const h = new Date(s.dt * 1000).getHours();
                    return h >= 11 && h <= 13;
                }) ?? slots[Math.floor(slots.length / 2)];

            const date = new Date(dateStr + 'T12:00:00Z');
            return {
                dateStr, // ADDED: So we know what day this is when clicked
                dayLabel: date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
                temp: Math.round(noon.main.temp),
                icon: noon.weather[0].icon,
                desc: noon.weather[0].description,
                windKt: Math.round(noon.wind.speed * 1.94384),
            };
        });

    // If no day is selected, default to the first day (today)
    const activeDate = selectedDate || days[0]?.dateStr;

    return (
        <div className="weekForecast">
            {days.map((d, i) => {
                const isSelected = activeDate === d.dateStr;
                return (
                    <div 
                        key={i} 
                        className="weekDay"
                        onClick={() => onSelectDay(d.dateStr)}
                        // ADDED: Styling to make it look clickable and highlight the chosen day
                        style={{ 
                            cursor: 'pointer', 
                            background: isSelected ? 'rgba(75, 168, 160, 0.15)' : 'transparent',
                            borderRadius: '12px',
                            padding: '8px 4px',
                            transition: 'background 0.2s'
                        }}
                    >
                        <span className="weekDayLabel">{d.dayLabel}</span>
                        <img
                            className="weekDayIcon"
                            src={`https://openweathermap.org/img/wn/${d.icon}.png`}
                            alt={d.desc}
                            title={`${d.desc} · ${d.windKt} kt`}
                        />
                        <span className="weekDayTemp">{d.temp}°</span>
                        <span className="weekDayWind">{d.windKt} kt</span>
                    </div>
                )
            })}
        </div>
    );
}