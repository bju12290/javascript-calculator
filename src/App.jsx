import React from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = React.useState("")
  console.log(answer)
  const [expression, setExpression] = React.useState("")
  console.log(expression)
  const buttons = [0,1,2,3,4,5,6,7,8,9,"/", "*", "-", "+",".","C","="]
  const trimExpression = expression.trim()

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol)
  }

 const buttonPress = (symbol) => {
  //console.log(symbol)
  if (symbol === "C") {
    setAnswer("")
    setExpression("0")
  } else if (isOperator(symbol)) {
    setExpression(trimExpression + " " + symbol + " ")
  } else if (symbol === "=") {
    calculate()
  } else if (symbol === "0") {
    if(expression.charAt(0) !== "0") {
      setExpression(expression + symbol)
    }
  } else if (symbol === ".") {
    const lastNumber = expression.split(/[-+/*]/g).pop();
    if (lastNumber.includes(".")) return
    setExpression(expression + symbol)
  } else {
    if(expression.charAt(0) === "0") {
      setExpression(expression.slice(1) + symbol)
    } else {
      setExpression(expression + symbol)
    }
  }
 }

 const calculate = () => {
  if (isOperator(trimExpression.charAt(trimExpression.length - 1))) return;
  const parts = trimExpression.split(" ")
  const newParts = []

  // Loop through parts in reverse
  for (let i = parts.length - 1; i >= 0; i--) {
    if ((["*","/","+"]).includes(parts[i]) && isOperator(parts[i - 1])) {
      newParts.unshift(parts[i])
      let j = 0
      let k = i - 1
      while (isOperator(parts[k])) {
        k--
        j++
      }
      i -= j
    } else {
      newParts.unshift(parts[i])
    }
  }
  const newExpression = newParts.join(" ")
  if (isOperator(newExpression.charAt(0))) {
    setAnswer(`${eval(answer + newExpression)}`);
  } else {
    setAnswer(`${eval(newExpression)}`)
  }
  setExpression("")
 }

 const Buttons = () => {

  const buttonTextMapping = {
    "C": "clear",
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    "/": "divide",
    "*": "multiply",
    "-": "subtract",
    "+": "add",
    ".": "decimal",
    "=": "equals"
  }

  const buttonElements = buttons.map(button => {
    const buttonText = buttonTextMapping[button]
    return <button style={{ gridArea: `${buttonText}` }}className={buttonText} key={buttonText} onClick={() => buttonPress(button)} id={buttonText}>{button}</button>
  })
  return <>{buttonElements}</>
 }

  return (
    <>
      <div className="calculator--container">
            <div className="display" id="display" style={{textAlign: "right"}}>
              <div id="answer">{answer}</div>
              <div id="expression">{expression}</div>
            </div>
          <div className="calculator" id="calculator">
            <Buttons/>
          </div>
      </div>
    </>
  )
}

export default App
