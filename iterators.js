// iterators and generators
// exercises: http://csbin.io/iterators

const iterator = () => {
  const createFunction = (array) => {
    let i = 0;
    const inner = () => {
      const element = array[i];
      i++;
      return element;
    }
    return inner;
  }

  const returnNextElement = createFunction(['a','b','c']);
  const el1 = returnNextElement();
  const el2 = returnNextElement();
  const el3 = returnNextElement();
  const el4 = returnNextElement();

  console.log('4 calls to returnNextElement: ', el1, el2, el3, el4);

  const returnNextElement2 = createFunction(['a','b','c']);
  const el01 = returnNextElement2();
  const el02 = returnNextElement2();
  const el03 = returnNextElement2();
  const el04 = returnNextElement2();

  console.log('4 calls to returnNextElement2: ', el01, el02, el03, el04);
}

// a little slower than map, forEach, normal for loop; faster than for of
// based on tests here: https://jsperf.com/iterators-comparison

const infiniteGenerator = () => {
  function* gen(startValue = 0) {
    let index = startValue;
    while (true) {
      yield index++
    }
  }
  const get = gen();
  console.log('a generator looks like this: ', get);
  console.log('.next() returns values like this', get.next());
  console.log('or this', get.next());
  console.log('after running .next() twice a generator looks like this: ', get)
}

const weirdGenerator = () => {
  function* gen(num) {
    yield 'start'
    yield num + 3;
    let next = yield num * 7;
    yield next;
    const arrow = () => {
      return 'inside arrow next = ' + next++;
    }
    yield arrow; //generators can yield a function that closes over its variable environment
    yield 'in generator next= ' + next;
    //the next variable here is the same as the next
    //that the above function closes over
    yield 'end of generator';
  }

  const get = gen(7);
  console.log(get.next());
  console.log(get.next());
  console.log(get.next());
  console.log(get.next(3));
  const returnedFunction = get.next();
  console.log(returnedFunction);
  console.log(returnedFunction.value());
  console.log(returnedFunction.value());
  console.log(get.next());
  console.log(get.next());
}

const generatorAsync = () => {
  console.log('1. main thread started');
  const doWhenDataReceived = value => {
    console.log('5. next() called second time')
    returnNextElement.next(value);
  }

  function* createFlow() {
    const data = yield fetch('https://api.chucknorris.io/jokes/random');
    console.log('6. generator finished running: ', data);
  }

  const returnNextElement = createFlow();
  console.log('2. next() called fist time')
  const futureData = returnNextElement.next().value;
  console.log('3. promise created: ', futureData)

  futureData.then(data => data.json())
    .then(json => json.value)
    .then(value => doWhenDataReceived(value));

  console.log('4. main thread done')
}

const generatorAsyncDisplay = `
<pre class="language-javascript"><code>
const generatorAsync = () => {
  console.log('1. main thread started');
  const doWhenDataReceived = value => {
    console.log('5. next() called second time')
    returnNextElement.next(value);
  }

  function* createFlow() {
    const data = yield fetch('https://api.chucknorris.io/jokes/random');
    console.log('6. generator finished running: ', data);
  }

  const returnNextElement = createFlow();
  console.log('2. next() called fist time')
  const futureData = returnNextElement.next().value;
  console.log('3. promise created: ', futureData)

  futureData.then(data => data.json())
    .then(json => json.value)
    .then(value => doWhenDataReceived(value));

  console.log('4. main thread done')
}
</code></pre>
`

const builtInAsync = () => {
  console.log('1. main thread started')
  const getQuote = async () => {
    console.log('3. async function started')
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    console.log('4. fetch complete, json() starting')
    const json = await response.json();
    console.log('5. json() done')
    const value = json.value;
    console.log('6. asyn function finished: ', value);
  }

  getQuote();

  console.log('2. main thread done');
}

const builtInAsyncDisplay = `
<pre class="language-javascript"><code>
const builtInAsync = () => {
  console.log('1. main thread started')
  const getQuote = async () => {
    console.log('3. async function started')
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    console.log('4. fetch complete, json() starting')
    const json = await response.json();
    console.log('5. json() done')
    const value = json.value;
    console.log('6. asyn function finished: ', value);
  }

  getQuote();

  console.log('2. main thread done');
}
</code></pre>
`

// export index
export const iteratorsIndex = [
  // { header: 'Iterator', button: 'Who needs loops?', function: iterator },
  // { header: 'Infinite Generator', button: 'What does it look like?', function: infiniteGenerator },
  // { header: 'Weird Generator', button: 'Lets get weird!', function: weirdGenerator },
  { header: 'Built in Async... await', button: 'Easy mode', function: builtInAsync, display: builtInAsyncDisplay },
  { header: 'Async... await with a Generator', button: 'Whats the wait?', function: generatorAsync, display: generatorAsyncDisplay },
]