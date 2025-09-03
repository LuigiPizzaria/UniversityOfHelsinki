import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [foundCountries, setFoundCountries] = useState([])

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
        <CountryList countries={foundCountries} />
    </div>
  )
}

export default App