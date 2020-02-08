// async tinkering
// exercises: http://csbin.io/promises

function funWithAsync() {
  const blockFor1Sec = () => {
    // this takes roughly a second to run
    let result = 0;
    for (let i = 0; i < 400000000; i++) {
      result += i * 3.14;
    }
    console.log('blockFor1Sec finished');
  }

  setTimeout(() => console.log('setTimeout finished'), 0); //task queue/callback queue

  Promise.resolve()
    .then(() => console.log('Promise finished')); //microtask queue/job queue //older browsers may classify as tasks

  blockFor1Sec();

  console.log('main function finished');
}

const funWithAsyncString = `
<pre class="language-javascript"><code>
${funWithAsync}
</code></pre>
`


//resources and notes
// https://frontendmasters.com/courses/javascript-new-hard-parts/calling-the-outside-world/
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/ --microtasks occur before tasks
// https://www.ecma-international.org/ecma-262/7.0/#sec-jobs-and-job-queues
// https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context
// https://v8.dev/blog/fast-async

// callback queues, event loop, and call stack are all part of the JS engine
// callback queues (task and microtask queues) FIFO
// as opposed to call stacks which are LIFO

//fetch
// 1. returns a placeholder Promise object
//   a. value property starts undefined
//   b. any .then's are added to onFullfillment array
//   c. when below xhr completes, Promise.value gets a value and functions in Promise.onFullfillment
//     are run in order, each taking the previous Promise value as their argument,
//     and returns a Promise with the modified value
// 2. browser API xhr is initiated
//
//
//


//trying to look at Promises
function lookAtPromises() {
  console.log('sync code starts');
  const logAndDouble = (promiseValue) => {
    console.log('Promise resolved by first .then');
    return promiseValue * 2;
  };

  const logAndDivideByThree = (promiseValue) => {
    console.log('async code ends with second .then');
    return promiseValue / 3;
  };

  const unfulfilledPromise = new Promise((resolve, reject) => {});
  console.log('unfulfilledPromise as a Promise: ', unfulfilledPromise);
  console.log('unfulfilledPromise as a string: ', JSON.stringify(unfulfilledPromise));

  console.log('async code starts');
  const initialPromise = Promise.resolve(42);
  console.log('the initialPromise as a Promise: ', initialPromise);
  console.log('the initialPromise as a string: ', JSON.stringify(initialPromise));

  const endPromise = initialPromise.then(logAndDouble)
    .then(logAndDivideByThree);

  console.log('promise before microtasks can run', endPromise);

  setTimeout(() => console.log('setTimeout comes in: ', initialPromise, endPromise), 1000)
  console.log('sync code ends')
}

const lookAtPromisesString = `
<pre class="language-javascript"><code>
${lookAtPromises}
</code></pre>
`


//pipe reduce function
function pipeExample() {
  const add2 = (num) => num + 2;
  const double = (num) => num * 2;
  const subtract2 = (num) => num - 2;

  const functionsToRun = [add2, double, subtract2];

  const functionRunner = (func, value) => {
    return func(value);
  }

  const output1 = functionsToRun.reduce((accumulator, currentValue) => functionRunner(currentValue, accumulator), 0);
  console.log('started with 0, ended with: ', output1)

  const output2 = functionsToRun.reduce((accumulator, currentValue) => functionRunner(currentValue, accumulator), 7);
  console.log('started with 7, ended with: ', output2)

  const output3 = functionsToRun.reduce((accumulator, currentValue) => functionRunner(currentValue, accumulator), 11);
  console.log('started with 11, ended with: ', output3)

}

const pipeExampleString = `
<pre class="language-javascript"><code>
${pipeExample}
</code></pre>
`

// cause why not?
function fetchChuckNorris() {
  const chuckQuotes = fetch( 'https://api.chucknorris.io/jokes/random');
  console.log('Promise at send time: ', chuckQuotes);

  chuckQuotes.then(response => response.json())
    .then(data => console.log(data.value))
    .then( () => console.log('Promise after fulfillment: ', chuckQuotes));

  console.log('Promise after .then', chuckQuotes);
}

const fetchChuckNorrisString = `
<pre class="language-javascript"><code>
${fetchChuckNorris}
</code></pre>
`

//export index
export const asyncIndex = {
  group: 'aSync Snippets',
  examples: [
    {
      header: 'Fun with async',
      buttons: [
        {
          name: 'Which finishes first?',
          function: funWithAsync
        },
      ],
      display: funWithAsyncString,
      resources: ['https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/']
    },
    {
      header: 'Promise hunting',
      buttons: [
        {
          name: 'Check out promises',
          function: lookAtPromises
        },
      ],
      display: lookAtPromisesString
    },
    {
      header: 'Pipe with reduce',
      buttons: [
        {
          name: 'Pipes',
          function: pipeExample
        },
      ],
      display: pipeExampleString
    },
    {
      header: 'Random Chuck Norris quote',
      buttons: [
        {
          name: 'Chain .thens',
          function: fetchChuckNorris
        },
      ],
      display: fetchChuckNorrisString
    }
  ]
}
