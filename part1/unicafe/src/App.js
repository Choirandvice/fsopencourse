import { useState } from 'react'
import './App.css';

const ROUNDING_MULTIPLIER = 10

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  )
}

const Statistics = ({good,bad,neutral}) => {

  if(good+bad+neutral==0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else{

    const total = good + neutral + bad
    const average = Math.round((good * 1 + bad * -1)/(total)*ROUNDING_MULTIPLIER)/ROUNDING_MULTIPLIER
    const positive = Math.round(100*(good)/(total)*ROUNDING_MULTIPLIER)/ROUNDING_MULTIPLIER + "%"

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
  }
}


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

      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App