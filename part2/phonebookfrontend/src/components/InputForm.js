const InputForm = ({handlePersonAdd,newName,handlePersonChange,newNumber,handleNumberChange}) => {

  return(
    <div>
      <h2>add a new entry</h2>
      <form onSubmit={handlePersonAdd}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default InputForm