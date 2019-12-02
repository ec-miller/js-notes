//js recent parts

//template strings

function upper(strings, ...values) {
  let stringToReturn = ''

  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      stringToReturn += values[i-1].toUpperCase()
    }
    stringToReturn += strings[i]
  }

  return stringToReturn
}

const name = "kyle",
  twitter = "getify",
  topic = "JS Recent Parts";

console.log(
  upper`Hello ${name} (@${twitter}), welcome to ${topic}!`
);

console.log(
  upper`Hello ${name} (@${twitter}), welcome to ${topic}!` ===
  "Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);

// formatting different datatypes
function formatThings(strings, ...values) {
  let stringToReturn = ''

  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      let formattedValue
      switch (typeof values[i-1]) {
        case 'number':
          formattedValue = `$${values[i-1]}`
          break
        case 'object':
          formattedValue = JSON.stringify(values[i-1])
          break
        case 'string':
          formattedValue = values[i - 1].toUpperCase()
        default:
          formattedValue = values[i - 1]
      }
      stringToReturn += formattedValue
    }
    stringToReturn += strings[i]
  }

  return stringToReturn
}

const boxName = 'box 1',
  label = 'proceeds from farming',
  amount = 4245.67,
  simpleObject = {numbers: [0,1,2]},
  simpleArray = [0, 1, 2]

console.log(formatThings`${boxName}. ${label} has ${amount}
here's other stuff: ${simpleObject} + ${simpleArray}`)