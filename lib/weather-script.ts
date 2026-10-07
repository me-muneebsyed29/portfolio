/*
 * Kept apart from lib/weather.ts, which uses React hooks, because the B2B
 * layout is a server component and only needs these strings.
 */
export const WEATHER_STORAGE_KEY = "sky-weather";

/* Runs inline at the top of the page body, before anything paints, so a
   visitor who left it raining doesn't get a flash of sunshine on reload. */
export const WEATHER_SCRIPT = `try{var w=localStorage.getItem("${WEATHER_STORAGE_KEY}");if(w==="rainy"||w==="snowy")document.documentElement.dataset.weather=w}catch(e){}`;
