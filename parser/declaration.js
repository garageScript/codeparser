const parseDeclaration = (declaration, descriptor) => {
      const declarationVar = declaration].id
      const declarationValue = declaration].init
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

module.exports = parseDeclaration

