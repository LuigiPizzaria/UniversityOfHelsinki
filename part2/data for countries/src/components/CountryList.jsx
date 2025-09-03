import Country from "./Country"

const CountryList = ({ countries }) => {
    if(countries.length === 0){
        return null
    }

    if(countries.length === 1){
        return(
            <Country country={countries[0]} />
        )
    }

    if(countries.length<=10){
        return (
            <ul>
                {countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
            </ul>
        )
    }

    return <p>Too many matches, specify another filter</p>
    
}

export default CountryList