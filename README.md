# SailCast - Weather App for UK Coastal Sailors
# Group 31
**ECS522U GUI Coursework 2025/26 - Assignment 2**

## Overview
SailCast is a React-based weather dashboard tailored specifically for UK coastal sailors. It fetches real-time weather data and 5-day forecasts, converting standard metrics into maritime formats (e.g., Knots, Beaufort Scale) and combining them with marine wave data to generate a custom Safety Status score.

## App Features
- Live weather data/forecast for any coastal location (Default Location as Portsmouth).
- Interactive Windy map, that defaults to the entered location.
- Assessiblity options (resizable fonts).
- Key weather metrics for the day including wind, gust, direction and wave height.
- Wind, temperature and percipitation graphs.
- 5-day weather forecasts.
- At three hour intervals (for 5 days) safety scoring can be visually observed for future trip planning.
- Time & Date displayed on dashboard.
- Favourite locations (max 3) can be saved and accessed via the Sidebar menu.

### App Extension Features
- Safety Status card: switches between safe,caution and unsafe based on the weather forecasts using wind gust/speed, tidal height & visibility. Including a check for non coastal locations. It programmatically aligns Open-Meteo's hourly wave height data with OpenWeather's wind/gust/visibility data to provide tailored, actionable advice for sailors.
- Maritime Conversions: Standard API wind speeds are automatically converted from m/s to Knots (kt) and dynamically mapped to the official Beaufort Wind Force Scale.
- Interactive Accessibility: A custom text-scaling feature is available in the sidebar, allowing users to increase font sizes across the app up to 150% to accommodate varying visual needs without breaking the UI layout.
- Disclaimer Interception: Wrapper functions are used to ensure the user acknowledges a safety/liability disclaimer before allowing them to search for locations.


## Attributions
App Icon: The boat icon used in the header (icons8-boat-64.svg) is provided by [Icons8](https://icons8.com/).

UI Icons: All standard interface icons (e.g., hamburger menu, compass, waves) are imported as inline SVGs from the open-source [Lucide](https://lucide.dev/) library.
