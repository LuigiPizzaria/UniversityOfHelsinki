import { useState } from 'react'

//component to display the anectode with the most votes
//if no votes are casted, it will display a message saying "No votes yet"
const Votes = ({index,anecdotes, votes}) => {
  if(index === -1){
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes yet</p>
      </div>
    )
  }
  return (
    <div>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[index]}</p>
    <p>has {votes[index]} votes</p>
  </div>
  )
}

const App = () => {
  //an array of anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  //selected is the index of the selected anecdote
  //votes is an array of votes for each anecdote
  const [bestIndex, setBestIndex] = useState(-1)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  //getRandom is a function that returns a random number between 0 and the length of the anecdotes array
  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  //getRandomAnecdote is a function that sets the selected anecdote to a random one
  //it will not select the same anecdote twice in a row
  //it will use the getRandom function to get a random number
  //it will use a while loop to check if the random number is the same as the selected one
  //if it is the same, it will get another random number
  //it will set the selected anecdote to the random number
  const getRandomAnecdote = () => {
    var random = getRandom()
    while (random === selected) {
      random = getRandom()
    }
    setSelected(random)
  }

  //vote is a function that will increase the vote of the selected anecdote by 1
  //it will create a copy of the votes array
  //it will use the spread operator to create a copy of the votes array
  //it will increase the vote of the selected anecdote by 1
  //it will set the votes state to the copy of the votes array
  //it will use the setVotes function to set the votes state to the copy of the votes array
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)

    //return the index of the anecdote with the most votes (mathMax takes the first element of the array with the most votes !!!!)
    const max = Math.max(...copy);
    //if the selected anecdotes as as many votes as the first element with the most votes it is the best anecdote
    //if the selected anectode has the most votes set the best Index to the selected index
    if(copy[selected] === max) {
      setBestIndex(selected);
    }
  }

  //getRandomAnecdote is a function that will set the selected anecdote to a random one
  //it will use the getRandom function to get a random number
  //it will use a while loop to check if the random number is the same as the selected one
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <Votes index={bestIndex} anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App

var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 }
]

var totalAmount = orders.reduce(
  function(sum, order){
    return sum + order.amount
  }, 0
)

var totalAmount = 0
for (var i = 0; i < orders.length; i++) {
  totalAmount += orders[i].amount
}

