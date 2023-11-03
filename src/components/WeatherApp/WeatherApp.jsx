import React from 'react'
import { useState , useEffect} from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


export const WeatherApp = () => {

  let API_KEY = "d44f09ab82732adcdf7ed0f0c6312baa";
  let [humidity,setHumidity]=useState(64);
  let [wind,setWind]=useState(18);
  let [temp,setTemp]=useState(24);
  let [location,setLocation]=useState("London");
  const [loading, setLoading] = useState(true);
  const [wicon,setWicon] = useState(cloud_icon);

  const search = async () => {
      const element = document.getElementsByClassName("city-input")
      console.log(element)
      if(element[0].value===""){
        return 0;
      }
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`

      let response = await fetch(url);

      let data= await response.json();
      console.log(data);

      setHumidity(data.main.humidity);
      setWind(Math.floor(data.wind.speed));
      setTemp(Math.floor(data.main.temp));
      setLocation(data.name);
      
      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear_icon);
      } else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud_icon);
      } else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle_icon);
      } else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle_icon);
      } else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain_icon);
      } else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain_icon);
      } else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      }
  }

  const fetchWeatherByLocation = async (latitude, longitude) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setHumidity(data.main.humidity);
      setWind(Math.floor(data.wind.speed));
      setTemp(Math.floor(data.main.temp));
      setLocation(data.name);

      // Your existing icon logic...
      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear_icon);
      } else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud_icon);
      } else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle_icon);
      } else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle_icon);
      } else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain_icon);
      } else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain_icon);
      } else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather by location", error);
      setLoading(false);
    }
  };

  const updateWeatherByLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      }, (error) => {
        console.error("Error getting geolocation data", error);
        setLoading(false);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    updateWeatherByLocation(); // Fetch weather based on user's location when component mounts
  }, []);


  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="city-input" placeholder='Search'/>
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt="" />
        </div>
        <button className="loc-button" onClick={updateWeatherByLocation}>LOC</button>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        {temp}°c
      </div>
      <div className="weather-location">
        {location}
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate">{wind}km/hr</div>
            <div className="text">WindSpeed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
