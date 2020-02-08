//lexical scoping --> closure

function lexicalScope() {
  function returnValue() {
    return a;
  };

  function returnValue2() {
    let a = 21;
    return a;
  };

  function returnReturnValue3Function() {
    let a = 63;
    return function returnValue3() {
      return a;
    };
  };

  const returnValue3 = returnReturnValue3Function()

  let a = 7;

  console.log(returnValue());
  console.log(returnValue2());
  console.log(returnValue3());
}

const lexicalScopeString = `
<pre class="language-javascript"><code>
${lexicalScope}
</code></pre>
`


//simple closure example
function simpleClosure() {
  function makeCounter() {
    let count = 0

    function incrementCount() {
      console.log(count++)
    }

    return incrementCount
  }

  const counter1 = makeCounter()

  const counter2 = makeCounter()

  return [counter1, counter2]
}

// these functions are called by the buttons below
const [counter1, counter2] = simpleClosure()

const simpleClosureString = `
<pre class="language-javascript"><code>
${simpleClosure}
</code></pre>
`

export const closureIndex = {
  group: 'Lexical Scope and Closure',
  examples: [
    {
      header: 'Lexial Scope and Closure',
      buttons: [
        {
          name: 'Log Results',
          function: lexicalScope
        },
      ],
      display: lexicalScopeString,
      resources: false
    },
    {
      header: 'Chaning Values in Closure',
      buttons: [
        {
          name: 'Run Counter 1',
          function: counter1
        },
        {
          name: 'Run Counter 2',
          function: counter2
        },
      ],
      display: simpleClosureString,
      resources: false
    },
  ]
}