import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  //meant for controlling the input field for a new name
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    //filter the persons array based on the search term
  }

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
      <h1>Phonebook</h1>
      <div>
        Search for name: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addPhonebookEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value ={newNumber} onChange={handleNumberChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.length === 0 ? (
          <p>No entries found</p>
        ) : (filteredPersons.map(person =>
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App