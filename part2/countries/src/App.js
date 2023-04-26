import { useState,useEffect } from "react";
import axios from 'axios'

const CountryEntry = ({country}) => {
  return(
    <li key={country.name.common}>{country.name.common}</li>
  )
}

const CountryList = ({countries}) => {

  return(
    <ul>
      {countries.map(country => <CountryEntry country={country}></CountryEntry>)}
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

const CountryDisplay = ({countries}) => {

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
    <CountryList countries={countries}></CountryList>
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


  if(countries!==null){

    const countriesToShow = 
      currentFilter===''
      ? countries
      : countries.filter(country => country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))
  

    return (
      <div>
        <p>find countries <input value={currentFilter} onChange={handleFilterChange}></input></p>
          <CountryDisplay countries={countriesToShow}></CountryDisplay>
      </div>
    );
  }
  else{
    return null
  }
}

export default App