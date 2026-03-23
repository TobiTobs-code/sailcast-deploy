//the 7 day row
import React from 'react';

export default function WeekForecast({ forecastData }) {
    if (!forecastData?.list) return null;

    // Group slots by calendar day
    const byDay = {};
    forecastData.list.forEach((slot) => {
        const key = new Date(slot.dt * 1000).toISOString().slice(0, 10);
        if (!byDay[key]) byDay[key] = [];
        byDay[key].push(slot);
    });

    const days = Object.entries(byDay)
        .slice(0, 7)
        .map(([dateStr, slots]) => {
            // Prefer a noon reading, fall back to middle slot
            const noon =
                slots.find((s) => {
                    const h = new Date(s.dt * 1000).getHours();
                    return h >= 11 && h <= 13;
                }) ?? slots[Math.floor(slots.length / 2)];

            const date = new Date(dateStr + 'T12:00:00Z');
            return {
                dayLabel: date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
                temp: Math.round(noon.main.temp),
                icon: noon.weather[0].icon,
                desc: noon.weather[0].description,
                windKt: Math.round(noon.wind.speed * 1.94384),
            };
        });

    return (
        <div className="weekForecast">
            {days.map((d, i) => (
                <div key={i} className="weekDay">
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
            ))}
        </div>
    );
}