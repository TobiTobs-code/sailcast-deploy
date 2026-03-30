// Full screen Windy map page
// Shown when user clicks the map icon in the search bar
// Back button returns to the dashboard

export default function MapPage({ windyUrl, locationName, onBack }) {
    return (
      <div className="mapPage">
  
        {/* Top bar with back button and title */}
        <div className="mapPageHeader">
  
          {/* Back button — returns to dashboard */}
          <button className="mapPageBack" onClick={onBack}>
            {/* Left arrow icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12,19 5,12 12,5"/>
            </svg>
            Back to Dashboard
          </button>
  
          {/* Page title showing location name */}
          <span className="mapPageTitle">
            🌊 Wind Map
            {locationName && (
              <span className="mapPageLocation"> — {locationName}</span>
            )}
          </span>
  
          {/* Empty div to balance the flexbox */}
          <div style={{ width: '140px' }} />
        </div>
  
        {/* Windy iframe — full screen */}
        {windyUrl ? (
          <iframe
            src={windyUrl}
            className="mapPageIframe"
            title="Windy wind map"
            allowFullScreen
          />
        ) : (
          /* No location searched yet */
          <div className="mapPageEmpty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9a9a9a" strokeWidth="1.5">
              <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>
              <path d="M15 5.764v15"/>
              <path d="M9 3.236v15"/>
            </svg>
            <p>Search for a coastal location first to see the wind map</p>
            <button className="mapPageBackBtn" onClick={onBack}>
              Go back and search
            </button>
          </div>
        )}
  
      </div>
    )
  }