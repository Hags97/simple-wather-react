import { useState } from "react";

// 

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '128198e4a17d03f92b608446e9b68de2';

    const [ciudad, setCiudad] = useState('');
    const [dataWeather, setdataWeather] = useState(null);

    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ciudad.length > 0) fetchWeather();
        
    }


    const fetchWeather = async () =>{
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json();
            setdataWeather(data);
        }
        catch(error)
        {
            console.log('Error: ' + error);
        }
    }

    return (
        <div className="container">
            <h1>Weather App</h1>

            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value = {ciudad}
                onChange = {handleCambioCiudad}
                />

                <button type="submit">Buscar</button>
            </form>

            {dataWeather && (
                <>
                    <h2>{dataWeather.name}</h2>
                    <p>Temperatura: {parseInt(dataWeather?.main.temp - 273)} ºC</p>
                    <p>Condición meteorolgica: {dataWeather.weather[0].description} </p>
                    <img src={` https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} alt="" />
                </>
                
            )}
        </div>
    )
}
