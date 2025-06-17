import { useState } from 'react'

const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {
  if (props.all === 0){
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{props.positive}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => {
    return good + neutral + bad
  }

  const average = () => {
    if (all() === 0){
      return 0
    }
    return (good * 1) + (neutral * 0) + (bad * -1) / all()
  }

  const positive = () => {
    if (all() === 0){
      return 0
    }
    return (good / all())*100
  }

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button onClick={() => setGood(good + 1)} text={"good"}/>
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all()} average={average()} positive={positive()}/>
    </div>
  )
}

export default App