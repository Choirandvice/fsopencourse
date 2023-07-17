import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

import InputForm from "./components/InputForm"
import FilterField from './components/FilterField'
import NumbersList from './components/NumbersList'
import NotificationMessage from './components/NotificationMessage'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setStatusMessage(`Replaced number for ${newName}`)
            setTimeout(()=>setStatusMessage(null),5000)
            setNewName('')  
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Person '${newPerson.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            },5000)
            setPersons(persons.filter(person => person.id !== replacedId))
          })
 
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
          setStatusMessage(`Added ${newName}`)
          setTimeout(()=>setStatusMessage(null),5000)
          setNewName('')  
          setNewNumber('')    
        })
      
    }

  }

  const handlePersonDelete = (id) => {
    console.log(`deleting ${id}`)

    personService.deletePerson(id)
      .then(response =>{

        // get the person's name for status message
        const personName = persons.find(person => person.id===id).name

        setPersons(persons.filter(person=>person.id!==id))
        setStatusMessage(`Deleted ${personName}`)
        setTimeout(()=>setStatusMessage(null),5000)

    })

  }


  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <NotificationMessage message={statusMessage}></NotificationMessage>
      <FilterField currentFilter={currentFilter} setFilter={setFilter}></FilterField>
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