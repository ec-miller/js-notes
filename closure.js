//simple closure example
const simpleClosure = () => {
  function makeCounter() {
    let count = 0

    function incrementCount() {
      return count++
    }

    return incrementCount
  }

  const counter = makeCounter()
  console.log(counter()) //0
  console.log(counter()) //1
  console.log(counter()) //2
  console.log(counter()) //3

  const newCounter = makeCounter()
  console.log(newCounter()) //0
  console.log(newCounter()) //1
}

const simpleClosureString = `
<pre class="language-javascript"><code>
function makeCounter() {
  let count = 0

  function incrementCount() {
    return count++
  }

  return incrementCount
}

const counter = makeCounter()
console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())

const newCounter = makeCounter()
console.log(newCounter())
console.log(newCounter())
</code></pre>
`

//naive useState implementation
function stateContainer() {
  let value;
  let firstRender = true;

  function changeValue(newValue) {
    value = newValue;
  }

  function stateInteractor(initialValue) {
    if (firstRender) {
      value = initialValue
      firstRender = false
    }

    return [value, changeValue]
  }

  return stateInteractor
}

const naiveUseState = () => {
  const useState = stateContainer()

  //first render
  const [name, setName] = useState('The Hammer');
  console.log(name)

  //second render
  const [name2, setName2] = useState('The Hammer');
  console.log(name2)
  //set a new name
  setName2('Marky Mark')

  //third render
  const [name3, setName3] = useState('The Hammer');
  console.log(name3)
  //set another new name
  setName3('Los Penguinos')

  //fourth render
  const [name4, setName4] = useState('The Hammer');
  console.log(name4)
}

const naiveUseStateString = `
<pre class="language-javascript"><code>
//naive useState implementation
function stateContainer() {
  let value;
  let firstRender = true;

  function changeValue(newValue) {
    value = newValue;
  }

  function stateInteractor(initialValue) {
    if (firstRender) {
      value = initialValue
      firstRender = false
    }

    return [value, changeValue]
  }

  return stateInteractor
}


//let's try it out
const useState = stateContainer()

//first render
const [name, setName] = useState('The Hammer');
console.log(name)

//second render
const [name2, setName2] = useState('The Hammer');
console.log(name2)
//set a new name
setName2('Marky Mark')

//third render
const [name3, setName3] = useState('The Hammer');
console.log(name3)
//set another new name
setName3('Los Penguinos')

//fourth render
const [name4, setName4] = useState('The Hammer');
console.log(name4)
</code></pre>
`

const functionComponent = () => {
  //let's try it out with a function component
  const useState2 = stateContainer()

  const CoolComponent = ({ updateCounter }) => {
    const [count, setCount] = useState2(0)

    if (updateCounter) {
      setCount(count + 1)
    }

    return `<>the count is ${count}< />`
  }

  console.log(CoolComponent({ updateCounter: false }))
  console.log(CoolComponent({ updateCounter: true }))
  console.log(CoolComponent({ updateCounter: false }))
  console.log(CoolComponent({ updateCounter: true }))
  console.log(CoolComponent({ updateCounter: true }))
}

const escapedTemplateString = "<>the count is ${ count }< />"

const functionComponentString = `
<pre class="language-javascript"><code>
//naive useState implementation
function stateContainer() {
  let value;
  let firstRender = true;

  function changeValue(newValue) {
    value = newValue;
  }

  function stateInteractor(initialValue) {
    if (firstRender) {
      value = initialValue
      firstRender = false
    }

    return [value, changeValue]
  }

  return stateInteractor
}


//let's try it out with a function component
const useState2 = stateContainer()

const CoolComponent = ({ updateCounter }) => {
  const [count, setCount] = useState2(0)

  if (updateCounter) {
    setCount(count + 1)
  }

  return ${escapedTemplateString}
}

console.log(CoolComponent({ updateCounter: false }))
console.log(CoolComponent({ updateCounter: true }))
console.log(CoolComponent({ updateCounter: false }))
console.log(CoolComponent({ updateCounter: true }))
console.log(CoolComponent({ updateCounter: true }))
</code></pre>
`



export const closureIndex = {
  group: 'Closure and useState',
  examples: [
    {
      header: 'Simple Closure Example',
      button: 'Enter the closure',
      function: simpleClosure,
      display: simpleClosureString,
      resources: false
    },
    {
      header: 'Naive useState',
      button: 'useState',
      function: naiveUseState,
      display: naiveUseStateString,
      resources: false
    },
    {
      header: 'Naive useState in functional component',
      button: 'useState in function component',
      function: functionComponent,
      display: functionComponentString,
      resources: false
    },
  ]
}