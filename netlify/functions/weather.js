export async function handler(event, context) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const city = event.queryStringParameters.city || "Perth";

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (currentData.cod !== 200 || forecastData.cod !== "200") {
      return {
        statusCode: currentData.cod || 500,
        body: JSON.stringify({
          error: currentData.message || "City not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        current: currentData,
        forecast: forecastData,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
}
