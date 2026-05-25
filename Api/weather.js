// api/weather.js

export default async function handler(req, res) {
  const city = req.query.city;

  const API_KEY = process.env.WEATHER_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}// api/weather.js

export default async function handler(req, res) {
  const city = req.query.city;

  const API_KEY = process.env.WEATHER_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}