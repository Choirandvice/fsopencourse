import { useState } from 'react'

const DisplayAnecdote = ({votes, anecdote}) => (
  <div>
    <p>
      {anecdote}
    </p>
    <p>
      has {votes} votes
    </p>
  </div>
)

const BestAnecdote = ({votes_array, anecdotes}) => {
  
  var most_votes = 0
  var most_votes_i = 0
  for (var i in votes_array){
    if (votes_array[i]>most_votes){
      most_votes = votes_array[i]
      most_votes_i = i
    }
  }
  
  return(
    <div>
      <h1>
        Anecdote with most votes
      </h1>
      <DisplayAnecdote votes = {most_votes} anecdote = {anecdotes[most_votes_i]}></DisplayAnecdote>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomize_anecdote = () => {
    console.log("randomising")
    const new_anecdote_index = Math.floor(Math.random() * anecdotes.length);
    setSelected(new_anecdote_index)
  }

  const add_vote = () => {
    console.log("adding votes, currently:" + votes)
    const new_votes = [...votes]
    new_votes[selected] += 1

    setVotes(new_votes)
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <DisplayAnecdote votes = {votes[selected]} anecdote = {anecdotes[selected]}></DisplayAnecdote>
      <p>
        <button onClick={add_vote}>vote</button>
        <button onClick={randomize_anecdote}>next anecdote</button>
      </p>
      <BestAnecdote votes_array={votes} anecdotes={anecdotes}></BestAnecdote>
    </div>
  )
}

export default App