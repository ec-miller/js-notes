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

    const resources = document.createElement('div');
    resources.innerHTML = `
        <h5>Resources</h5>
        ${ item.resources ? item.resources.map(resource => `<a target="_blank" href=${resource}>Jake's Blog</a>`) : null}
      `

    mountPoint.appendChild(header);
    mountPoint.appendChild(code);
    mountPoint.appendChild(document.createElement('br'))
    mountPoint.appendChild(button);
    if (item.resources) {
      mountPoint.appendChild(resources)
    }
  })
}

mountExamples(asyncIndex);
mountExamples(iteratorsIndex);
