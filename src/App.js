import { useEffect, useState } from 'react';
import * as convert from 'xml-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './reset.css';
import './font.css';
import WeatherBox from './component/WeatherBox';
import AirBox from './component/AirBox';

function App() {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null)
  const [apiError, setAPIError] = useState('');

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherCurrentLocation(lat, lon)
    });
  }

  //openWeather API에서 날씨 상태 요청하고 받아오기
  const getWeatherCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce118d43c17267f2eafbf02dccec03d0&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data)
    } catch (err) {
      setAPIError(err.message);
    }
  }

  const getAirQuality = async () => {
    try {
      let url = `http://openAPI.seoul.go.kr:8088/6e744b576b646a613534526c6d7a67/xml/ListAirQualityByDistrictService/1/5/111301/ `;
      let response = await fetch(url);
      let data = await response.text();
      let result = convert.xml2json(data, {compact: true, spaces: 4});
      let air = JSON.parse(result)
      setAirQuality(air)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCurrentLocation();
    getAirQuality()
  }, [])

  return (
    <div>
      <div className="container">
      <h1>현재 위치: {weather?.name} </h1>
        <WeatherBox weather={weather} />
        <AirBox airQuality={airQuality} />
    </div>
    </div>
  );
}

export default App;