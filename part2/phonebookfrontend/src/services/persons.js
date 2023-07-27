import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  console.log(`pulling all persons from server`)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = newObject => {
  console.log(`creating ${newObject} in server`)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  console.log(`deleting ${id} from server`)
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const replacePerson = (id, newObject) => {
  console.log(`replacing ${id} on server`)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const exportedModule = { 
  getAll, 
  createPerson, 
  deletePerson, 
  replacePerson
};

// export default { getAll, createPerson, deletePerson, replacePerson }
export default exportedModule