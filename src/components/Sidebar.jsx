// Sidebar shell — slides in from left when isOpen is true
// Contains SavedLocations and Accessibility sections
import SavedLocations from './SavedLocations'
import Accessibility from './Accessibility'

export default function Sidebar({ isOpen, onClose, onSearch, onFontSizeChange }) {
  return (
    <>
      {/* Dark overlay behind sidebar — click to close */}
      {isOpen && (
        <div
          className="sidebarOverlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? 'sidebarOpen' : ''}`}>

        {/* Header */}
        <div className="sidebarHeader">
          <span className="sidebarTitle">⛵ SailCast</span>
          <button className="sidebarClose" onClick={onClose}>✕</button>
        </div>

        {/* Saved Locations section */}
        <div className="sidebarSection">
          <h3 className="sidebarSectionTitle">⭐ Saved Locations</h3>
          <SavedLocations onSearch={(city) => { onSearch(city); onClose(); }} />
        </div>

        {/* Divider */}
        <div className="sidebarDivider" />

        {/* Accessibility section */}
        <div className="sidebarSection">
          <h3 className="sidebarSectionTitle">♿ Accessibility</h3>
          <Accessibility onFontSizeChange={onFontSizeChange} />
        </div>

      </div>
    </>
  )
}