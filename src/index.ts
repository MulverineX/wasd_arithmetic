import { comment as $, execute } from 'sandstone/commands';
import { MCFunction, Predicate, _ } from 'sandstone/core';
import { addLabel, removeLabel } from 'smc-label';
import calculate from './calculate';
import { newScore, newLabel, parse_id } from './utils';


const directions = [ 'backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right' ] as const;

/**
 * The directions the player is inputting.
 */
export class Direction {
  /**
   * Exclusive direction score
   */
  public score = newScore('loc_dir');

  /**
   * Absolute values
   */
  public absolute = {
    /**
     * Absolute Rotation normalized to 0-360(000)
     */
    rotation: newScore('abs_rot'),
    /**
     * Absolute X & Z Motion vector
     */
    vector: {
      X: newScore('vec_x'),
      Z: newScore('vec_z')
    }
  }

  /**
   * Absolute Rotation normalized to 0-360(000)
   */
  public local_rotation = newScore('loc_rot');

  /** 
   * The 8 possible directions
   */
  public directions = directions;

  /**
   * Whether the player is moving
   */
  public moving = newLabel('is_moving');

  /**
   * Whether the player is mounted
   */
  public mounted = newLabel('is_mounted');

  /**
   * The 4 cardinal directions
   */
  public cardinals = [ directions[0], directions[2], directions[4], directions[6]] as const;

  /**
   * Whether the player is inputting forward
   */
  public forward = newLabel(this.cardinals[2]);

  /**
   * Whether the player is inputting backward
   */
  public backward = newLabel(this.cardinals[0]);

  /**
   * Whether the player is inputting left
   */
  public left = newLabel(this.cardinals[1]);

  /**
   * Whether the player is inputting right
   */
  public right = newLabel(this.cardinals[3]);

  /**
   * The 4 dual/diagonal directions
   */
  public diagonals = [ directions[1], directions[3], directions[5], directions[7] ] as const;

  /**
   * Check for an exclusive direction the player is inputting
   * @param dir Direction to check for
   */
  public exact (direction: typeof directions[number]) {
    return this.score.equalTo(directions.findIndex(x => x === direction) + 1);
  }
  
  /**
   * Gives static values for a local vector
   * @param dir Direction to get a vector for, number 0-7
   * @param magnitude Multiplier for values
   */
  public local_vector (direction: typeof directions[number] | number, magnitude: number = 1) {
    const full = 1*magnitude;

    const diag = Math.sqrt(full**2) / 2;

    // 'backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right'
    switch (typeof direction === 'number' ? direction : directions.findIndex(x => x === direction)) {
      case 0: return { Z: full*-1, X: 0 };
      case 1: return { Z: diag*-1, X: diag };
      case 2: return { Z: 0,       X: full };
      case 3: return { Z: diag,    X: diag };
      case 4: return { Z: full,    X: 0 };
      case 5: return { Z: diag,    X: diag*-1 };
      case 6: return { Z: 0,       X: full*-1 };
      case 7: return { Z: diag*-1, X: diag*-1 };
      default: return { Z: 0,      X: 0 } // TypeScript moment
    }
  }
}

const input = new Direction();

const main = MCFunction('_wasd/get_direction', () => {
  addLabel(input.moving);

  $('Clear flags');
  input.score.set(0);

  removeLabel(input.forward);
  removeLabel(input.backward);
  removeLabel(input.left);
  removeLabel(input.right);

  $('Run calculations & output')
  const local_rotation = calculate(input);

  let angle = -180.0,
      alt = false;

  $('# Exclusive Inputs');
  $('Backward');
  _.if(local_rotation.matches([1574, 1800]), () => { input.score.set(1) });

  for (let i in input.directions) {
    const first = i == '0';

    if (!first) $(parse_id(input.directions[i]));

    const angle_a = angle + ( first ? 0 : (alt ? -.1 : .1));

    angle += first ? 22.5 : 45;

    const angle_b = angle + (i == '7' ? .1 : (alt ? -.1 : .1));

    const score = parseInt(i) + 1;

    _.if(local_rotation.matches([angle_a*10, angle_b*10]), () => { input.score.set(score) });

    alt = !alt;
  }

  $('');
  $('# Inclusive Inputs');
  $('Backward')

  // _.or is broken
  _.if(input.score.equalTo(8), () => { addLabel(input.backward) });
  _.if(input.score.matches([1, 2]), () => { addLabel(input.backward) });

  let num = 2;

  for (const cardinal of input.cardinals.slice(1).map(x => input[x])) {
    $(parse_id(cardinal.name.split('.')[1]));

    _.if(input.score.matches([num, num + 2]), () => { addLabel(cardinal) });

    num += 2;
  }
});

export const is_mounted = Predicate('is_mounted', {
  condition: 'minecraft:entity_properties',
  entity: 'this',
  predicate: { vehicle: {} }
});

function ensure_motion() {
  removeLabel(input.moving);

  $('Ensure there is a vector');
  _.if(_.not(_.and(
    input.absolute.vector.X.equalTo(0), 
    input.absolute.vector.Z.equalTo(0)
  )), () => main());
}

const old =     { X: newScore('ovec_x'), Z: newScore('ovec_z') },
      current = { X: newScore('cvec_x'), Z: newScore('cvec_z') };

const walking = MCFunction('_wasd/walking', () => {
  removeLabel(input.mounted);

  $('Store position to scores for access');

  execute.store.result.score(current.X).run.
    data.get.entity('@s', 'Pos[0]', 1000);

  execute.store.result.score(current.Z).run.
    data.get.entity('@s', 'Pos[2]', 1000);

  input.absolute.vector.X.set(current.X).remove(old.X);

  input.absolute.vector.Z.set(current.Z).remove(old.Z);

  old.X.set(current.X);
  old.Z.set(current.Z);

  ensure_motion();
});

const mounted = MCFunction('_wasd/mounted', () => {
  addLabel(input.mounted);

  $('Store motion to scores for access');

  execute.store.result.score(input.absolute.vector.X).run.
    data.get.entity('@s', 'Motion[0]', 1000);

  execute.store.result.score(input.absolute.vector.Z).run.
    data.get.entity('@s', 'Motion[2]', 1000);

  ensure_motion();
});

/**
 * Get input directions from a player
 * @param mode Define if mode of input is assured
 */
export default function wasd (mode: 'walking' | 'mounted' | false = false) {
  if (!mode) _.if(is_mounted, () => mounted()).else(() => walking());
  else if (mode === 'walking') walking();
  else mounted();

  ensure_motion();

  return input;
}