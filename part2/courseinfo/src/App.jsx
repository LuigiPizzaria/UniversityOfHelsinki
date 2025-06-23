
const SumOfExercises = ({ parts }) => {
  //0 is the initial value for the sum
  var total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Course = ({ course }) => {
  return(
    <div>
    <Header name = {course.name}/>
    <div>
      {course.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
    <SumOfExercises parts={course.parts} />
  </div>
  )
}

const App = () => {
  const course = {
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
      ,
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App