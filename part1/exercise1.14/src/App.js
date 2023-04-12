import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = 0
  const average = 0



  const setGoodValueTo = (newValue) => {
    console.log('value good now', newValue)
    setGood(newValue)
  }

  const setNeutralValueTo = (newValue) => {
    console.log('value neutral now', newValue)
    setNeutral(newValue)
  }

  const setBadValueTo = (newValue) => {
    console.log('value bad now', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>    
      <Button handleClick={() => setGoodValueTo(good + 1)} text="good" />
      <Button handleClick={() => setNeutralValueTo(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBadValueTo(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good*1 + bad*-1)/(good+neutral+bad)}</p>
      <p>positive {100*(good)/(good+neutral+bad)}%</p>
    </div>
  )
}

export default App