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

export default Course;