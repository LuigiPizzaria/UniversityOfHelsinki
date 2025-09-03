import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY

    //fetch weather data from api every time the country prop changes (component is rendered with a different country)
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    const kelvinToCelsius = (kelvin) => (kelvin-273.15).toFixed(2)

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            {weather ? (
                <div>
                <img src={country.flags.png} alt="flag" />
                <h2>Weather in {country.capital}</h2>
                <p>Temperature {kelvinToCelsius(weather.main.temp)}</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                </div>
            ) : (<p>Loading weather...</p>)}
            
        </div>
    )
}

export default Country