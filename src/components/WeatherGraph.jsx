//the hourly wind/ temp/ rain panel
import React, { useEffect, useRef, useState, useMemo } from 'react';

const tabs = ['wind', 'temperature', 'precipitation'];

function Arrow({ degrees }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="windArrow"
            style={{ transform: `rotate(${degrees}deg)` }}
        >
            <path
                d="M7 1 L7 13 M3 5 L7 1 L11 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BarGraph({ data }) {
    const maxVal = Math.max(...data.map((d) => d.value), 1);

    return (
        <div className="barGraph">
            {data.map((point, i) => {
                const heightPct = Math.max((point.value / maxVal) * 100, 4);
                const isHighest = point.value === maxVal;
                return (
                    <div key={i} className="barCol">
            <span className="barValueLabel">
              {point.value}
                <span className="barUnit">{point.unit}</span>
            </span>

                        {point.dir !== undefined && point.dir !== null && (
                            <div className={`arrowWrap ${isHighest ? 'arrowHighlight' : ''}`}>
                                <Arrow degrees={point.dir} />
                            </div>
                        )}

                        <div className="barTrack">
                            <div
                                className={`barFill ${isHighest ? 'barFillHighest' : ''}`}
                                style={{ height: `${heightPct}%` }}
                            />
                        </div>

                        <span className="barTimeLabel">{point.time}</span>
                    </div>
                );
            })}
        </div>
    );
}

function LineGraph({ data }) {
    const canvasRef = useRef(null);
    const maxVal = Math.max(...data.map((d) => d.value), 1);
    const minVal = Math.min(...data.map((d) => d.value), 0);
    const range = maxVal - minVal || 1;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || data.length === 0) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.offsetWidth || 560;
        const H = 80;
        canvas.width = W;
        canvas.height = H;
        const pad = { top: 12, bottom: 12, left: 8, right: 8 };

        ctx.clearRect(0, 0, W, H);

        const pts = data.map((d, i) => ({
            x: pad.left + (i / (data.length - 1)) * (W - pad.left - pad.right),
            y: pad.top + (1 - (d.value - minVal) / range) * (H - pad.top - pad.bottom),
        }));

        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, 'rgba(58,90,78,0.2)');
        grad.addColorStop(1, 'rgba(58,90,78,0)');
        ctx.beginPath();
        ctx.moveTo(pts[0].x, H);
        pts.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(pts[pts.length - 1].x, H);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            const cpx = (pts[i - 1].x + pts[i].x) / 2;
            ctx.bezierCurveTo(cpx, pts[i - 1].y, cpx, pts[i].y, pts[i].x, pts[i].y);
        }
        ctx.strokeStyle = '#3a5a4e';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.stroke();

        pts.forEach((p, i) => {
            const isMax = data[i].value === maxVal;
            ctx.beginPath();
            ctx.arc(p.x, p.y, isMax ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = isMax ? '#3a5a4e' : '#f0ede4';
            ctx.strokeStyle = '#3a5a4e';
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
        });
    }, [data, maxVal, minVal, range]);

    return (
        <div className="lineGraph">
            <div className="lineLabelRow">
                {data.map((d, i) => (
                    <span key={i} className="lineValueLabel">
            {d.value}
                        <span className="lineUnit">{d.unit}</span>
          </span>
                ))}
            </div>
            <canvas ref={canvasRef} className="lineCanvas" />
            <div className="lineLabelRow">
                {data.map((d, i) => (
                    <span key={i} className="lineTimeLabel">{d.time}</span>
                ))}
            </div>
        </div>
    );
}

export default function WeatherGraph({ forecastData }) {
    const [activeTab, setActiveTab] = useState('wind');

    const graphData = useMemo(() => {
        if (!forecastData?.list) return [];
        const slots = forecastData.list.slice(0, 8);

        if (activeTab === 'wind') {
            return slots.map((s) => ({
                time: new Date(s.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                value: Math.round(s.wind.speed * 1.94384),
                unit: 'kt',
                dir: s.wind.deg,
            }));
        }
        if (activeTab === 'temperature') {
            return slots.map((s) => ({
                time: new Date(s.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                value: Math.round(s.main.temp),
                unit: '°C',
                dir: null,
            }));
        }
        if (activeTab === 'precipitation') {
            return slots.map((s) => ({
                time: new Date(s.dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                value: parseFloat(((s.rain?.['3h'] ?? 0) + (s.snow?.['3h'] ?? 0)).toFixed(1)),
                unit: 'mm',
                dir: null,
            }));
        }
        return [];
    }, [forecastData, activeTab]);

    if (!forecastData?.list) {
        return (
            <div className="graphLoading">
                <span className="graphLoadingDot" />
                <span className="graphLoadingDot" />
                <span className="graphLoadingDot" />
            </div>
        );
    }

    return (
        <div className="weatherGraph">
            <div className="graphTabBar">
                {tabs.map((tab, i) => (
                    <React.Fragment key={tab}>
                        <button
                            className={`graphTab ${activeTab === tab ? 'graphTabActive' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                        {i < tabs.length - 1 && <span className="graphTabDivider">|</span>}
                    </React.Fragment>
                ))}
            </div>

            <div className="graphArea">
                {activeTab === 'temperature' ? (
                    <LineGraph data={graphData} />
                ) : (
                    <BarGraph data={graphData} />
                )}
            </div>
        </div>
    );
}