import { asyncIndex } from './async.js';
import { iteratorsIndex} from './iterators.js';

const mountPoint = document.querySelector('.mount');

const mountExamples = ( index ) => {
  index.forEach((item) => {
    const header = document.createElement('h3');
    header.innerHTML = item.header;

    const button = document.createElement('button');
    button.innerHTML = item.button;
    button.onclick = item.function;

    mountPoint.appendChild(header);
    mountPoint.appendChild(button);
  })
}

mountExamples(asyncIndex);
mountExamples(iteratorsIndex);
