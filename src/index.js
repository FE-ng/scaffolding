import './index.css';
import './index.less';
import './test.css';

class Animal {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const dog = new Animal('dog');

const root = document.querySelector('#root');
root.innerHTML = 'hello, webpack!';
