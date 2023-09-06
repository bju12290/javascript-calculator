import React from 'react'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const [displayData, setDisplayData] = React.useState('')
  const [currentOperator, setCurrentOperator] = React.useState('')
  const digits = [0,1,2,3,4,5,6,7,8,9]
  const operators = ["/", "x", "-", "+"]

  const handleDisplay = (digit) => {
    if (operators.includes(displayData)) {
      setDisplayData(`${digit}`)
    } else {
      setDisplayData(displayData + digit)
    }
  }

  const handleOperator = (operator) => {
    setCurrentOperator(operator)
  }

  const DigitElements = () => {
    const digitElements = digits.map(digit => {
      return <div onClick={() => handleDisplay(digit)} className={digit === 0 ? "zero digit" : "digit" } id={digit} key={digit}>{digit}</div>
    })
    return <div>{digitElements}</div>
  }

  const OperatorElements = () => {
    const operatorElements = operators.map(operator => {
      return <div onClick={() => {
        handleOperator(operator)
        setDisplayData(operator)}} className={operator} id={operator} key={operator}>{operator}</div>
    })
    return <div>{operatorElements}</div>
  }

  return (
    <>
      <div id="display" className="display">{displayData}</div>
      <div className="equal--button" id="equals">=</div>
      <DigitElements />
      <OperatorElements />
    </>
  )
}

export default App
