

const calculator = document.querySelector("#calculator .calculator-input")

let strings = ""
let result = ""

calculator.addEventListener("click", function(event){
  const text = event.target.innerText
  console.log(text)

  switch (text) {
    case '<' :
      
      break
    case 'AC' :
      
      break
    case '=' :
      showResult()
      break

    default :
      addFomula(text)
  }
})

function addFomula(str) {
  strings += str
}

function showResult() {
  // result = eval(strings)
  const resultFn = new Function(
    `return ${strings}`
  )
  result = resultFn()
  console.log(result)
}
