import React from 'react'

const AirBox = (airQuality) => {
    console.log(airQuality.airQuality)

    let pm10 = (airQuality ? airQuality.airQuality : null)?.ListAirQualityByDistrictService.row.PM10._text
    let pm25 = (airQuality ? airQuality.airQuality : null)?.ListAirQualityByDistrictService.row.PM25._text

    return (
        <div className='box half'>
            <div className="text_area">
                <p>미세먼지: <span>{pm10}</span></p>
                <p>초미세먼지: <span>{pm25}</span></p>
            </div>
        </div>
    )
}

export default AirBox