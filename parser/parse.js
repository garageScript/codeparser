const babelParser = require('@babel/parser')

let nameCounter = 0

const allNames = {}

const getName = (name) => {
  if (allNames[name]) {
    name = `${name}-${nameCounter}`
    nameCounter += 1
  }
  allNames[name] = true
  return name
}

function Context (inputName="Global") {
  const name = getName(inputName)
  const element = document.createElement('div')
  element.classList.add('global-context')
  element.innerHTML = `
  <div>
  <h2>Variables</h2>
  <div class="variable-container"></div>
  <hr />
  <h2>otherContext</h2>
  <div class="context-container"></div>
  </div>
  `
  console.log('window.document', window.document)
  window.document.body.append(element)
  let programStack = []
  document.querySelector('.next').addEventListener('click', () => {
    this.runNext()
  })

  this.addSteps = (steps) => {
    programStack = programStack.concat([...steps])
  }

  const descriptor = document.querySelector('.description')

  const variableContainer = element.querySelector('.variable-container')
  this.runNext = () => {
    const program = programStack.shift()
    const {type, declarations, kind} = program
    console.log(program)
    if (type === 'VariableDeclaration') {
      const declarationVar = declarations[0].id
      const declarationValue = declarations[0].init
      const varName = declarationVar.name
      const varValue = declarationValue.extra.rawValue
      descriptor.innerText = `
      Setting ${varName} to ${varValue}
      `
      const newVariable = document.createElement('h3')
      const constStr = kind === 'const' ? 'const ' : ''
      newVariable.innerText = `${constStr}${varName} is ${varValue}`
      variableContainer.append(newVariable)
    }
  }
}

const codeEntry = document.querySelector('.code-entry')
const result = babelParser.parse(codeEntry.innerText)
console.log(result)


const mainContext = new Context()
mainContext.addSteps(result.program.body)

