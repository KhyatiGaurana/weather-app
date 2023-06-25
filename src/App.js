
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import {  useState } from 'react';
import Forecast from './components/forcast/forecast';
// import ReactSwitch from 'react-switch';

// export const ThemeContext=createContext(null);
function App() {

// const[theme, setTheme]=useState("dark");
const[currentWeather, setCurrentWeather]= useState(null);
const[forecast, setForecast]=useState(null);

  // const toggleTheme=()=>{
  //   setTheme((curr)=>(curr==="light"?"dark":"light"));
  // }
  const handleOnSearchChange = (searchData)=>{
    const[lat, lon]=searchData.value.split(" ");

    const currentWeatherFetch=fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=1616ebcc61e5257d73e9140b3fd35921&units=metric`);
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=1616ebcc61e5257d73e9140b3fd35921&units=metric`);
    Promise.all([currentWeatherFetch, forcastFetch])
    .then(async(response)=>{
      const weatherResponse= await response[0].json();
      const forecastResponse= await response[1].json();

      setCurrentWeather({city:searchData.label, ...weatherResponse});
      setForecast({city:searchData.label, ...forecastResponse});
    })
    .catch(console.log);
  };

  console.log(currentWeather);
  console.log(forecast);
  return (
    //<ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="container" >
        <Search onSearchChange={handleOnSearchChange}/>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
        {forecast && <Forecast data={forecast}/>}
        
        {/*<div className='switch'>
          <label>{theme==="light"?"Light Mode":"Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme==="dark"}/>
  </div>*/}
        
      </div>
      
    //</ThemeContext.Provider>
  );
}

export default App;
