const Course = ({course}) => {
  console.log(course);
  return (
    <div>
      <Header name = {course.name}></Header>
      <Content parts = {course.parts}></Content>
      <Total parts = {course.parts}></Total>
    </div>
  )
}

const Header = ({name}) => {
  console.log(name)

  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}></Part>
      )}
    </div>
  )
}

const Part = ({part}) => {
  const {name,exercises} = part

  console.log(part)

  // console.log(part)
  return (
    <p>
      {name} {exercises}
    </p>
  )

}
const Total = ({parts}) => {
  console.log(parts);

  const total = parts.reduce((sum,part) => (sum+=part.exercises),0)

  console.log(total);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

export default Course