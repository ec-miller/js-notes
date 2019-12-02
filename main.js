import { asyncIndex } from './aSync/async.js';
import { iteratorsIndex} from './iterators.js';

const mountPoint = document.querySelector('.mount');

const mountExamples = ( index ) => {
  index.forEach((item) => {
    const header = document.createElement('h3');
    header.innerHTML = item.header;

    const code = document.createElement('code');
    code.innerHTML = item.display || null;

    const button = document.createElement('button');
    button.innerHTML = item.button;
    button.onclick = item.function;

    mountPoint.appendChild(header);
    mountPoint.appendChild(code);
    mountPoint.appendChild(document.createElement('br'))
    mountPoint.appendChild(button);
  })
}

mountExamples(asyncIndex);
mountExamples(iteratorsIndex);
