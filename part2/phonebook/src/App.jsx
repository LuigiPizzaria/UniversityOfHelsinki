import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  //meant for controlling the input field for a new name
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault() // Prevents the default form submission behavior

    // Check if the newName is empty
    if(newName === '') {
      return alert('Name cannot be empty')
    }

    const nameObject = {
      name: newName
    }

    //check if name already exists once
    if(persons.some(person => person.name === newName)) {
      setNewName('')
      return alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person,index) =>
          <p key={index}>{person.name}</p>
        )}
      </div>
    </div>
  )
}

export default App