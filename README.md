# SailCast - Weather App for UK Coastal Sailors
### Group 31 | ECS522U GUI Coursework 2025/26 - Assignment 2

## Overview
SailCast is a React-based weather dashboard tailored specifically for UK coastal sailors. It fetches real-time weather data and 5-day forecasts, converting standard metrics into maritime formats (e.g., Knots, Beaufort Scale) and combining them with marine wave data to generate a custom Safety Status score.

## Prerequisites
To run this application, you must have **Node.js** and **npm** (Node Package Manager) installed on your machine.

## How to Install and Run
Please follow these steps to run the application locally:

1. **Unzip the submission folder** and open your terminal or command prompt.

2. **Navigate into the project directory**:
   ```bash
   cd path/to/unzipped/folder
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

5. **Open the App**:
   Hold `Ctrl` (or `Cmd` on Mac) and click the local link provided in the terminal (usually `http://localhost:5173`), or paste it into your web browser.

## App Features
- Live weather data/forecast for any coastal location (default: Portsmouth).
- Interactive Windy map that defaults to the entered location.
- Accessibility options (resizable fonts).
- Key weather metrics for the day including wind, gust, direction, and wave height.
- Wind, temperature, and precipitation graphs.
- 5-day weather forecasts.
- Safety scoring at three-hour intervals (for 5 days) for visual future trip planning.
- Time & date displayed on the dashboard.
- Favourite locations (max 3) that can be saved and accessed via the Sidebar menu.

### App Extension Features
- **Safety Status card**: Switches between safe, caution, and unsafe based on weather forecasts using wind gust/speed, tidal height, and visibility — including a check for non-coastal locations. It programmatically aligns Open-Meteo's hourly wave height data with OpenWeather's wind/gust/visibility data to provide tailored, actionable advice for sailors.
- **Maritime Conversions**: Standard API wind speeds are automatically converted from m/s to knots (kt) and dynamically mapped to the official Beaufort Wind Force Scale.
- **Interactive Accessibility**: A custom text-scaling feature in the sidebar allows users to increase font sizes across the app up to 150% to accommodate varying visual needs without breaking the UI layout.
- **Disclaimer Interception**: Wrapper functions ensure the user acknowledges a safety/liability disclaimer before allowing them to search for locations.

## Attributions
- **App Icon**: The boat icon used in the header (`icons8-boat-64.svg`) is provided by [Icons8](https://icons8.com/).
- **UI Icons**: All standard interface icons (e.g., hamburger menu, compass, waves) are imported as inline SVGs from the open-source [Lucide](https://lucide.dev/) library.