import { useState,useEffect } from "react";
import axios from 'axios'

const CountryEntry = ({country,showCountry}) => {
  return(
    <li key={country.name.common}>{country.name.common}<button onClick={()=>showCountry(country)}>show</button></li>
  )
}

const CountryList = ({countries,showCountry}) => {

  return(
    <ul>
      {countries.map(country => <CountryEntry country={country} showCountry={showCountry}></CountryEntry>)}
    </ul>
  )
}

const LanguageEntry = ({language}) => {
  return(
    <li key={language}>{language}</li>
  )
}

const LanguageList = ({languages}) =>{
  const languagesArray = Object.keys(languages).map(key => [key,languages[key]])
  console.log(languagesArray)
  return(
    <ul>
      {languagesArray.map(language => <LanguageEntry language={language[1]}></LanguageEntry>)}
    </ul>
  )
}

const CountryDisplaySingle = ({country}) => {
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
    </div>
  )
}

const CountryDisplay = ({countries,showCountry}) => {

  if(countries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if(countries.length===1){
    return (
      <div>
        <CountryDisplaySingle country={countries[0]}></CountryDisplaySingle>
      </div>
    )
  }
  return(
    <CountryList countries={countries} showCountry={showCountry}></CountryList>
  )

}


const App = () => {
  const [countries,setCountries] = useState(null)
  const [currentFilter,setFilter] = useState('')

  useEffect(()=>{
    console.log("effect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log("countries retrieved")
        setCountries(response.data)
      })
  },[])


  const handleFilterChange = (event) => {
    console.log(`filter set to ${event.target.value}`)
    setFilter(event.target.value)
  }

  // set filter to unique code to highlight one single country
  const showCountry = (country) => {
    setFilter(`cca3:${country.cca3}`)
  }

  var countriesToShow

  if(countries!==null){

    if(currentFilter.substring(0,5).toLowerCase()==="cca3:"){
      countriesToShow = currentFilter.substring(5) === ''
        ? countries
        : countries.filter(country => country.cca3.toLowerCase().includes(currentFilter.substring(5).toLowerCase()))
    }
    else{
      countriesToShow = currentFilter===''
        ? countries
        : countries.filter(country => country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))
    }

    return (
      <div>
        <p>find countries <input value={currentFilter} onChange={handleFilterChange}></input></p>
          <CountryDisplay countries={countriesToShow} showCountry={showCountry}></CountryDisplay>
      </div>
    );
  }
  else{
    return null
  }
}

export default App