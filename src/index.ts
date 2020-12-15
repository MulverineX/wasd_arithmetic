/**
 * This file is just an example.
 * You can delete it!
 */

import { data, execute, raw, say, tag, tellraw } from 'sandstone/commands'
import { MCFunction, _ } from 'sandstone/core'
import { createObjective, Selector } from 'sandstone/variables';
import { addLabel, newLabel, newProperty, removeLabel } from './utils';


/* Create objectives */
const vec_x = newProperty('vec_x'), 
      vec_z = newProperty('vec_z'),
      rotation = newProperty('rot'),
      temp = [
        newProperty('tmp0'),
        newProperty('tmp1')
      ],
      raw_input = newProperty('input'),
      is_moving = newLabel('is_moving');


enum direction_score {
  forward = 1, left, backward, right,
  forward_left, forward_right,
  backward_left, backward_right
}

/**
 * The directions the player is inputting.
 */
class Direction {
  /**
   * Tells whether the player is inputting forward
   */
  public forward = newLabel('forward');

  /**
   * Tells whether the player is inputting backward
   */
  public backward = newLabel('backward');

  /**
   * Tells whether the player is inputting left
   */
  public left = newLabel('left');

  /**
   * Tells whether the player is inputting right
   */
  public right = newLabel('right');

  /**
   * Exclusive directions the player can input
   */
  public available = [ 'forward', 'left', 'backward', 'right', 'forward_left', 'forward_right', 'backward_left', 'backward_right' ];

  /**
   * Exclusive direction the player is inputting
   */
  public exact (direction: 'forward' | 'left' | 'backward' | 'right' | 'forward_left' | 'forward_right' | 'backward_left' | 'backward_right') {
    return raw_input.equalTo(direction_score[direction]);
  }
}

export const directions = new Direction();




const get_input = MCFunction('get_input', () => {
  // Clear flags
  raw_input.set(0);

  removeLabel(directions.forward);
  removeLabel(directions.backward);
  removeLabel(directions.left);
  removeLabel(directions.right);

  removeLabel(is_moving);


  // Store motion to scores for access
  execute.store.result.score(vec_x).runOne.
    data.get.entity('@s', 'Motion[0]', 1000)

  execute.store.result.score(vec_z).runOne.
    data.get.entity('@s', 'Motion[1]', 1000)


  // Ensure there is motion
  _.if(_.not(vec_x.equalTo(0)), () => addLabel(is_moving));
  _.if(_.not(vec_z.equalTo(0)), () => addLabel(is_moving));

  // Run calculations & output
  execute.as(is_moving.test()).run(() => {
    say('hi')
  })
})
