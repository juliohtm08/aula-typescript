let literal: 'Hello World';
let pi: 3.14;

const test = 5;

let option: 'Yes' | 'No' | 'Maybe';

let option2: number | boolean;

type Planet =
  | 'Mercúrio'
  | 'Vênus'
  | 'Terra'
  | 'Marte'
  | 'Júpiter'
  | 'Saturno'
  | 'Urano'
  | 'Netuno'
  | 'Plutão';

let planet: Planet;
let homePlanet: Planet;

function checkPlanet(planet: Planet) {
  if (planet === 'Terra') {
    console.log('estamos na Terra');
  }
}

type GreetingCallback = (name: string) => void;

function greet(callbackfn: GreetingCallback) {
  let name = 'julio';
  callbackfn(name);
}
