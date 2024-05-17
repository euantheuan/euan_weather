import React from 'react'

const WeatherBox = ({ weather }) => {
    console.log('weather :', weather)
    let icon = (weather?.weather) ? weather.weather[0].icon : null

    return (
        <div className='box half'>
            <div className='text_area'>
                <p>현재 기온: <span>{weather && weather.main.temp} ℃</span></p>
                <p>현재 습도: <span>{weather?.main.humidity}%</span></p>
            </div>
            <div className='weather_desc'>
                {(weather?.weather) ? weather.weather[0].description : null}
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
            </div>
        </div>
    )
}

export default WeatherBox