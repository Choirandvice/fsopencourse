import { useState } from 'react'

const NumbersList = ({persons}) => {
  console.log("Numberslist input", persons)
  return(
    <div>
      <h2>Numbers</h2>
        <ul>
          {
            persons.map((person)=>
              <ListEntry key={person.name} name={person.name} number={person.number}></ListEntry>
            )
          }
        </ul>
    </div>
  )
}

const ListEntry = ({name,number}) => {
  return(
    <li>{name} {number}</li>
  )
}

const FilterForm = ({currentFilter,setFilter}) => {
  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return(
    <div>
      filter shown with <input value={currentFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const InputForm = ({handlePersonAdd,newName,handlePersonChange,newNumber,handleNumberChange}) => {

  return(
    <div>
      <h2>add a new</h2>
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setFilter] = useState('')

  const personsToShow = currentFilter===''
    ? persons
    : persons.filter(note => note.name.toLowerCase().match(currentFilter.toLowerCase()))

  const handlePersonChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlePersonAdd = (event) =>{
    event.preventDefault()
    console.log("adding:",newName)


    // find name in current list
    if(persons.some(person=>person.name===newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber
      }  

      console.log("adding:",newPerson)

      setPersons(persons.concat(newPerson))
  
      setNewName('')  
      setNewNumber('')
    }

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm currentFilter={currentFilter} setFilter={setFilter}></FilterForm>
      <InputForm 
        handlePersonAdd={handlePersonAdd}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}></InputForm>
      <NumbersList persons={personsToShow}></NumbersList>
    </div>
  )
}

export default App