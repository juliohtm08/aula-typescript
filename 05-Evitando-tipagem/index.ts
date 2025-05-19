function sendSpaceship(spaceShip: { pilot: string; copilot?: string }) {
  // ...
}

sendSpaceship({ pilot: 'Han Solo', copilot: 'Chubacca' });
sendSpaceship({ pilot: 'Luke' });

let input: unknown;

input = 'text';
input = 20;
input = [];

let text: string;

text = input;
input = text;

let input2: any; // não recomendado

text = input2;

function verification(test) {
  if (test) {
  } else {
    let _check: never;

    let text = _check;

    text = '';

    return _check;
  }
}
