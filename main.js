import { asyncIndex } from './aSync/async.js';
import { iteratorsIndex} from './iterators.js';
import { closureIndex } from './closure.js';

const indexes = [asyncIndex, iteratorsIndex, closureIndex]
const selectField = document.querySelector('.select');
const mountPoint = document.querySelector('.mount');

const populateSelect = indexes => {
  indexes.forEach(index => {
    const option = document.createElement('option');
    option.value = index.group
    option.innerHTML = index.group
    selectField.appendChild(option);
  })
}

const mountExamples = examples => {
  if (examples) {
    mountPoint.innerHTML = '';
    examples.forEach(item => {
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
      Prism.highlightAll()
    })
  }
}

populateSelect(indexes)

const handleSelect = event => {
  const value = event.target.value;
  const index = indexes.find(index => index.group === value);
  mountExamples(index.examples);
}

selectField.onchange = handleSelect;
