import { useState,useEffect } from "react";
import axios from 'axios'

const CountryEntry = ({country,showCountry}) => {
  return(
    <li>{country.name.common}<button onClick={()=>showCountry(country)}>show</button></li>
  )
}

const CountryList = ({countries,showCountry}) => {

  return(
    <ul>
      {countries.map(country => <CountryEntry key={country.name.common} country={country} showCountry={showCountry}></CountryEntry>)}
    </ul>
  )
}

const LanguageEntry = ({language}) => {
  return(
    <li>{language}</li>
  )
}

const LanguageList = ({languages}) =>{
  const languagesArray = Object.keys(languages).map(key => [key,languages[key]])
  console.log(languagesArray)
  return(
    <ul>
      {languagesArray.map(language => <LanguageEntry key={language[1]} language={language[1]}></LanguageEntry>)}
    </ul>
  )
}

const WeatherDisplay = ({country,weatherData}) => {
  if(weatherData===null){
    return (<div></div>)
  }

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {Math.round((weatherData.main.temp-273.15)*100)/100} Celsius</div>
      <WeatherIcon weatherData={weatherData}></WeatherIcon>
      <div>wind {weatherData.wind.speed} m/s</div>
    </div>
  )
}

const WeatherIcon = ({weatherData}) => {
  const WeatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  
  return (
    <img src={WeatherIconUrl} alt={`icon representing ${weatherData.weather[0].description}`}></img>
  )

}

const CountryDisplaySingle = ({country,weatherData}) => {
  console.log(country.flag)

  const flagStyle = {
    fontSize: 200
  }

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital.join(", ")}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <LanguageList languages={country.languages}></LanguageList>
      <div style={flagStyle}>
        {country.flag}
      </div>
      <WeatherDisplay country={country} weatherData={weatherData}></WeatherDisplay>
    </div>
  )
}

const CountryDisplay = ({countries,showCountry,weatherData}) => {

  if(countries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if(countries.length===1){

    return (
      <div>
        <CountryDisplaySingle country={countries[0]} weatherData={weatherData}></CountryDisplaySingle>
      </div>
    )
  }
  return(
    <CountryList countries={countries} showCountry={showCountry}></CountryList>
  )

}

const App = () => {
 
  const [allCountries,setAllCountries] = useState(null)
  const [currentFilter,setFilter] = useState('')
  const [weatherData,setWeatherData] = useState(null)

  var countriesToShow = null

  if(allCountries!==null){
    if(currentFilter.substring(0,5).toLowerCase()==="cca3:"){
      countriesToShow=
        currentFilter.substring(5) === ''
        ? allCountries
        : allCountries.filter(country => country.cca3.toLowerCase().includes(currentFilter.substring(5).toLowerCase()))
      
    }
    else{
      countriesToShow=
        currentFilter===''
        ? allCountries
        : allCountries.filter(country => country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))
    }
  }
 
  useEffect(()=>{

    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log("countries retrieved")
        setAllCountries(response.data)
      })
  },[])

  // update weather
  useEffect(() => {

    if(countriesToShow!==null){
      if(countriesToShow.length===1){
        console.log("pulling weather data")
        const lat = Math.round(countriesToShow[0].capitalInfo.latlng[0]*100)/100
        const lng = Math.round(countriesToShow[0].capitalInfo.latlng[1]*100)/100
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`
        axios
          .get(url)
          .then(response => {
            console.log("weather data:",response.data)
            setWeatherData(response.data)
          })
      }
    }
  },[currentFilter])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // set filter to unique code to highlight one single country
  const showCountry = (country) => {
    console.log(`setting filter to show ${country.name}`)
    setFilter(`cca3:${country.cca3}`)
  }



  if(allCountries!==null){

    return (
      <div>
        <p>find countries <input value={currentFilter} onChange={handleFilterChange}></input></p>
          <CountryDisplay countries={countriesToShow} showCountry={showCountry} weatherData={weatherData}></CountryDisplay>
      </div>
    );
  }
  else{
    return null
  }
}

export default App