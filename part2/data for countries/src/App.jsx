import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [foundCountries, setFoundCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log('fetching countries...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  },[])

  const handleChange = (event) => {
    const value = event.target.value
    setFilter(value)
    if(countries) {
      if(value === '') {
        setFoundCountries([])
        setSelectedCountry(null)
      }
      else {
        const results = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setFoundCountries(results)
        console.log(results)
      } 
    }
  }

  return (
    <div>
        find countries: <input value={filter} onChange={handleChange} />
        {/*if selecttedCountry is not null, show that, otherwise show the list of foundCountries*/}
        {selectedCountry 
          ? <Country country={selectedCountry} />
          : <CountryList countries={foundCountries} onShow={setSelectedCountry} />
        }
    </div>
  )
}

export default App