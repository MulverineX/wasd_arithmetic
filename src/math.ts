import { comment as $, execute, scoreboard } from "sandstone/commands";
import { MCFunction, _ } from "sandstone/core";
import { absolute_rotation } from ".";
import { newProperty } from "./utils";

export default MCFunction('_wasd/math', () => {
  $('Get Rotation');
  execute.store.result.score(absolute_rotation).runOne.
    data.get.entity('@s', 'Motion[0]', 1000);

  _.if(absolute_rotation.lowerThan(0), () => { absolute_rotation.set(360000) });

  $('Calculate rotation vector');

  const calculate = [ newProperty('_calc0'), newProperty('_calc1') ];

  calculate[0].set(absolute_rotation);
  
  // function mounted_wasd:math/sin
  // scoreboard players operation *dxrot mp_wasd.var = @s mp_wasd.var2
  // scoreboard players operation *dxrot mp_wasd.var *= *-1 mp_wasd.const
  // scoreboard players operation @s mp_wasd.var = @s mp_wasd.rot_x
  // function mounted_wasd:math/cos
  // scoreboard players operation *dzrot mp_wasd.var = @s mp_wasd.var2

  // # Calculate dot product
  // scoreboard players operation @s mp_wasd.var = @s mp_wasd.pos_dz
  // scoreboard players operation *var mp_wasd.var = @s mp_wasd.pos_dx
  // function mounted_wasd:math/dot_product
  // scoreboard players operation @s mp_wasd.var *= *10 mp_wasd.const
  // tag @s[scores={mp_wasd.var=..-1}] add mp_wasd.negate

  // # Calculate determinant
  // scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.pos_dx
  // scoreboard players operation *var mp_wasd.var = @s mp_wasd.pos_dz
  // function mounted_wasd:math/determinant

  // tag @s[scores={mp_wasd.var2=1..}] add mp_wasd.forward
  // tag @s[scores={mp_wasd.var2=..-1}] add mp_wasd.backward

  // # Calculate head to motion angle
  // function mounted_wasd:math/atan2
})