import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const NumbersList = ({persons,personDelete}) => {
  console.log("Numberslist input", persons)
  return(
    <div>
      <h2>Numbers</h2>
        <ul>
          {
            persons.map((person)=>
              <ListEntry key={person.id} name={person.name} number={person.number} deleteEntry={()=>personDelete(person.id)}></ListEntry>
            )
          }
        </ul>
    </div>
  )
}

const ListEntry = ({name,number,deleteEntry}) => {
  return(
    <li>
      {name} {number} <button onClick={deleteEntry}>delete</button>
    </li>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setFilter] = useState('')

  const personsToShow = currentFilter===''
    ? persons
    : persons.filter(note => note.name.toLowerCase().match(currentFilter.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  

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
    if(persons.some(person=>person.name.toLowerCase()===newName.toLowerCase())){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const replacedId = persons.find(person => person.name.toLowerCase()===newName.toLowerCase()).id

        console.log(`replacing ${newName}`)

        const newPerson = {
          name: newName,
          number: newNumber
        }  

        personService.replacePerson(replacedId,newPerson)
          .then(returnedPerson=>{
            setPersons(persons.map(person=>person.id !== replacedId ? person : returnedPerson))
            setNewName('')  
            setNewNumber('')   
          }
        )
 
      }
      else{
        console.log(`ignoring request`)
      }
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber
      }  

      console.log("adding:",newPerson)

      personService.createPerson(newPerson)
        .then(returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')  
          setNewNumber('')    
        })
      
    }

  }

  const handlePersonDelete = (id) => {
    console.log(`deleting ${id}`)

    personService.deletePerson(id)
      .then(response =>{
        setPersons(persons.filter(person=>person.id!==id))

    })

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
      <NumbersList persons={personsToShow} personDelete={handlePersonDelete}></NumbersList>
    </div>
  )
}

export default App