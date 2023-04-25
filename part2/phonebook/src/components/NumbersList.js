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

export default NumbersList