import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  console.log(`pulling all persons from server`)
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This person is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
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
  console.error(`replacing ${id} on server`)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, createPerson, deletePerson, replacePerson }