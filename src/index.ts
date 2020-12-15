import { comment as $, execute, raw } from 'sandstone/commands'
import { MCFunction, _ } from 'sandstone/core'
import { addLabel, parse_id, newLabel, newProperty, removeLabel, hasLabel } from './utils';


/* Create objectives */
export const 
      vec_x = newProperty('vec_x'), 
      vec_z = newProperty('vec_z'),
      absolute_rotation = newProperty('abs_rot'),
      local_rotation = newProperty('loc_rot'),
      local_direction = newProperty('loc_dir'),
      is_moving = newLabel('is_moving');


enum local_directions { backward = 1, backward_left, left, forward_left, forward, forward_right, right, backward_right };

let dirs = [];
for (const [ dir ] of Object.entries(local_directions).slice(8,16)) {
  dirs.push(dir);
}

const directions = dirs;

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
  public available = directions;

  /**
   * Exclusive direction the player is inputting
   */
  public exact (direction: 'backward' | 'backward_left' | 'left' | 'forward_left' | 'forward' | 'forward_right' | 'right' | 'backward_right') {
    return local_direction.equalTo(local_directions[direction]);
  }
}

const input_directions = new Direction();


const main = MCFunction('_wasd/get_input', () => {
  $('Clear flags')
  local_direction.set(0);

  removeLabel(input_directions.forward);
  removeLabel(input_directions.backward);
  removeLabel(input_directions.left);
  removeLabel(input_directions.right);

  removeLabel(is_moving);

  $('Store motion to scores for access');
  execute.store.result.score(vec_x).runOne.
    data.get.entity('@s', 'Motion[0]', 1000);

  execute.store.result.score(vec_z).runOne.
    data.get.entity('@s', 'Motion[1]', 1000);

  $('Ensure there is motion');
  _.if(_.not(vec_x.equalTo(0)), () => addLabel(is_moving));
  _.if(_.not(vec_z.equalTo(0)), () => addLabel(is_moving));

  $('Run calculations & output')
  hasLabel(is_moving, () => {
    let angle = -180.0;

    let alt = false;

    $('# Exclusive Inputs');
    $('Backward');
    raw(`execute if score @s ${local_rotation.objective.name} matches 1574..1800 run`,
        `scoreboard players set @s ${local_direction.objective.name} 1`);
    for (let i in directions) { // Deepscan: TypeScript Moment.
      const first = i == '0';

      if (!first) $(parse_id(directions[i]));

      const angle_a = angle + ( first ? 0 : (alt ? -.1 : .1));

      angle += first ? 22.5 : 45;

      const angle_b = angle + (i == '7' ? .1 : (alt ? -.1 : .1));

      const score = parseInt(i) + 1;

      raw(`execute if score @s ${local_rotation.objective.name} matches ${angle_a*10}..${angle_b*10} run`,
        `scoreboard players set @s ${local_direction.objective.name} ${score}`);

      alt = !alt;
    }

    $('');
    $('# Inclusive Inputs');
    const cardinals = [ input_directions.left, input_directions.forward, input_directions.right ];

    $('Backward')
    const backward = `tag @s add ${input_directions.backward.raw_name}`;

    raw(`execute if score @s ${local_direction.objective.name} matches 8 run`, backward);
    raw(`execute if score @s ${local_direction.objective.name} matches 1..2 run`, backward);

    let num = 2;    

    for (const cardinal of cardinals) {
      $(parse_id(cardinal.name));
      raw(`execute if score @s ${local_direction.objective.name} matches ${num}..${num + 2} run`,
        `tag @s add ${cardinal.raw_name}`);
      num += 2;
    }
  })
})

export default function get_input () {
  main();
  return input_directions;
}