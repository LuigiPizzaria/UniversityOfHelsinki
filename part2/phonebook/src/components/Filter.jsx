const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
      <div>
        Search for name: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
  )
}

export default Filter;