import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([]) 

  //fill from json-server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setPersons(response.data)
      })
  },[])

  //meant for controlling the input field for a new name
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  

  const addPhonebookEntry = (event) =>{
    event.preventDefault()

    const phonebookObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length-1]?.id +1 || 0
    }

    if(newName === '' || newNumber === '') {
      return alert('Name or number cannot be empty')
    }

    //multiple people can share a phone number if they share a household so only check for duplicate names
    if(persons.some(person => person.name === newName)) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat(phonebookObject))
    setNewName('')
    setNewNumber('')
  }

  //convert the serach term and the names to lowercase for case-insensitive search
  //according to google every person hold one empty string in the name field so empty string is not an issue
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPhonebookEntry={addPhonebookEntry}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App