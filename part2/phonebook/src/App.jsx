import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([]) 

  //fill from json-server
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
  },[])

  //meant for controlling the input field for a new name
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  
  const OperationMessage = (message) => {
    setNotificationMessage(
        `${message}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      },5000)
  }

  const addPhonebookEntry = (event) =>{
    event.preventDefault()

    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    if(newName === '' || newNumber === '') {
      return alert('Name or number cannot be empty')
    }

    //instead of adding duplicate names, update with new number
    if(persons.some(person => person.name === newName)) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!confirm) {
        setNewName('')
        setNewNumber('')
        return
      }

      const personToUpdate = persons.find(person => person.name === newName)
      personService
      .update(personToUpdate.id,phonebookObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        OperationMessage(`Updated ${returnedPerson.name}`)
      })
      .catch(error => {
        alert(`Information of ${newName} has already been removed from server`)
        setPersons(persons.filter(person => person.id !== personToUpdate.id))
      })
      return
    }

    personService
    .create(phonebookObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      OperationMessage(`Added ${returnedPerson.name}`)
    })
  }

  const deletePerson = (id,name) => {
    console.log('delete', id)

    if(!window.confirm(`Delete ${name} ?`)){
      return
    }

    personService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  //convert the serach term and the names to lowercase for case-insensitive search
  //according to google every person hold one empty string in the name field so empty string is not an issue
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPhonebookEntry={addPhonebookEntry}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={deletePerson}/>
    </div>
  )
}

export default App