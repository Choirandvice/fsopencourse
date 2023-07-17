const FilterField = ({currentFilter,setFilter}) => {
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

export default FilterField