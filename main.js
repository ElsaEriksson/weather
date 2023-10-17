import axios from "axios";
import "./style.scss";

async function getWeather() {
  const response = await axios.get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,precipitation_hours&timezone=Europe%2FBerlin"
  );
  const weather = response.data;
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    weekdays.push(
      new Weekday(
        weather.daily.precipitation_hours[i],
        weather.daily.temperature_2m_max[i],
        weather.daily.temperature_2m_min[i],
        weather.daily.time[i]
      )
    );
  }
  console.log(weekdays);
  console.log(weather);
  createHTML(weekdays);
}

getWeather();

class Weekday {
  rain;
  maxTemp;
  minTemp;
  date;

  constructor(rain, maxTemp, minTemp, date) {
    this.rain = rain;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.date = date;
  }
}

function createHTML(weekdays) {
  const weatherContainer = document.getElementById("weatherContainer");
  for (let i = 0; i < weekdays.length; i++) {
    const weekdayContainer = document.createElement("div");
    weekdayContainer.className = "weekdayContainer";
    const rain = document.createElement("p");
    rain.className = "rain";
    const maxTemp = document.createElement("p");
    maxTemp.className = "maxTemp";
    const minTemp = document.createElement("p");
    minTemp.className = "minTemp";
    const date = document.createElement("p");
    date.className = "date";

    rain.innerHTML = "Hourly rain: " + weekdays[i].rain + " mm";
    maxTemp.innerHTML = weekdays[i].maxTemp;
    minTemp.innerHTML = weekdays[i].minTemp;
    date.innerHTML = weekdays[i].date;

    weekdayContainer.appendChild(date);
    weekdayContainer.appendChild(minTemp);
    weekdayContainer.appendChild(maxTemp);
    weekdayContainer.appendChild(rain);
    weatherContainer.appendChild(weekdayContainer);
  }
}
