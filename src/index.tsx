import Img from './assets/img/subway.jpg';

interface IAnimal {
  name: string;
}

class Animal {
  name: string;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const dog = new Animal('dog');
