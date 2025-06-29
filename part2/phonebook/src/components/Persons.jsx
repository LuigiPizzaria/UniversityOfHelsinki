const Persons = ({persons}) =>{
  return (
    <div>
        {persons.length === 0 ? (
          <p>No entries found</p>
        ) : (persons.map(person =>
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
  )
}
export default Persons;