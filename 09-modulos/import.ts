import { spaceShip } from './export';
import * as lodash from 'lodash';

interface BattleSpaceship extends spaceShip {
  weapons: number;
}

let xwing: BattleSpaceship = {
  name: 'X-wing',
  pilot: 'Luke',
  speed: 50,
  weapons: 4,
};

lodash.camelCase(xwing.pilot);
