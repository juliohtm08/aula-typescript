const spaceShip = {
  name: 'X-Wing',
  speed: 0,
};

function accelarate(spaceShip: { name: string; speed: number }, speed: number) {
  spaceShip.speed = speed;
}

accelarate(spaceShip, 50);
