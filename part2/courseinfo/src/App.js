import Note from "./components/Note"

const Course = ({course}) => {
  console.log(course);
  return (
    <div>
      <Header name = {course.name}></Header>
      <Content parts = {course.parts}></Content>
    </div>
  )
}

const Header = ({name}) => {
  console.log(name)

  return (
    <h1>{name}</h1>
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

const App = () => {
  const courses = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]},
    {
      id: 2,
      name: 'Half Stack application development 2',
      parts: [
        {
          name: 'Fundamentals of React 2',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data 2',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component 2',
          exercises: 14,
          id: 3
        }
      ]},
      {
        id: 3,
        name: 'Half Stack application development 3',
        parts: [
          {
            name: 'Fundamentals of React 3',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data 3',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component 3',
            exercises: 14,
            id: 3
          }
        ]}
  
  ]


  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course}></Course>
      )}
    </div>
  )


}


export default App