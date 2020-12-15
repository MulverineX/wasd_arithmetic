import { comment as $, execute } from 'sandstone/commands';
import { MCFunction, _ } from 'sandstone/core';
import { absolute_rotation, input_directions, vec_x, vec_z } from '.';
import { newProperty, newLabel, addLabel, removeLabel, hasLabel as is } from './utils';

const scale = (x: number) => x*1000;

export default MCFunction('_wasd/math', () => {
  $('# Get Rotation');
  execute.store.result.score(absolute_rotation).runOne.
    data.get.entity('@s', 'Motion[0]', 1000);

  _.if(absolute_rotation.lowerThan(0), () => { absolute_rotation.set(360000) });

  const calculate = [ newProperty('_calc0'), newProperty('_calc1') ],
        negate = newLabel('_negate');

  $('# Calculate rotation vector');

  calculate[0].set(absolute_rotation);

  const sine = () => {
    $("Calculate sine using Bhaskara I's approx.");
    calculate[0].modulo(scale(360));

    _.if(calculate[0].greaterOrEqualThan(scale(180)), () => { addLabel(negate) });

    is(negate, () => calculate[0].remove(scale(180)));

    calculate[1].set(scale(180));

    calculate[1].remove(calculate[0]);

    calculate[1].divide(1000);

    calculate[1].multiply(calculate[0]);

    calculate[0].set(scale(40500))

    calculate[0].remove(calculate[1]);

    calculate[1].multiply(4);

    calculate[0].divide(1000);

    calculate[1].divide(calculate[0]);

    is(negate, () => calculate[1].multiply(-1));

    removeLabel(negate);
  }
  
  sine();
  
  $('');

  const dxrot = calculate[0].objective.ScoreHolder('dxrot'),
        dzrot = calculate[0].objective.ScoreHolder('dzrot');

  dxrot.set(calculate[1]);

  dxrot.multiply(-1);

  calculate[0].set(absolute_rotation);

  $('');
  $('Calculate cosine ~ `cos(x)=sin(x+90)`')
  calculate[0].add(scale(90))
  sine();

  $('');

  const temp = calculate[0].objective.ScoreHolder('temp');

  $('# Calculate dot product');
  calculate[0].set(vec_z);
  temp.set(vec_x);

  calculate[0].multiply(dxrot);
  temp.multiply(dzrot);
  calculate[0].remove(temp);

  calculate[0].multiply(10);
  _.if(calculate[0].lowerOrEqualThan(-1), () => addLabel(negate));

  $('# Calculate determinant')
  temp.set(vec_z);
  calculate[1].set(vec_x);

  calculate[1].multiply(dxrot);
  temp.multiply(dzrot);
  calculate[1].add(temp);

  _.if(calculate[1].greaterOrEqualThan(1), () => addLabel(input_directions.forward))

  .elseIf(calculate[1].lowerOrEqualThan(-1), () => addLabel(input_directions.backward))

  $('# Calculate Local Rotation')
  $('Calculate arc tangent (atan2)')

  // scoreboard players operation @s mp_wasd.var /= @s mp_wasd.var2
  // tag @s[scores={mp_wasd.var=..-1}] add mp_wasd.flip
  // scoreboard players operation @s[tag=mp_wasd.flip] mp_wasd.var *= *-1 mp_wasd.const
  // tag @s[scores={mp_wasd.var=11..}] add mp_wasd.invert
  // scoreboard players operation @s[tag=mp_wasd.invert] mp_wasd.var2 = @s[tag=mp_wasd.invert] mp_wasd.var
  // scoreboard players set @s[tag=mp_wasd.invert] mp_wasd.var 100
  // scoreboard players operation @s[tag=mp_wasd.invert] mp_wasd.var /= @s mp_wasd.var2
  // scoreboard players operation *var mp_wasd.var = @s mp_wasd.var
  // scoreboard players remove *var mp_wasd.var 10
  // scoreboard players operation *var2 mp_wasd.var = @s mp_wasd.var
  // scoreboard players operation *var2 mp_wasd.var /= *100 mp_wasd.const
  // scoreboard players operation *var2 mp_wasd.var *= *383 mp_wasd.const
  // scoreboard players add *var2 mp_wasd.var 140
  // scoreboard players operation *var2 mp_wasd.var /= *100 mp_wasd.const
  // scoreboard players operation *var mp_wasd.var *= *var2 mp_wasd.var
  // scoreboard players set *var2 mp_wasd.var 450
  // scoreboard players operation *var2 mp_wasd.var -= *var mp_wasd.var
  // scoreboard players operation *var2 mp_wasd.var /= *10 mp_wasd.const
  // scoreboard players operation @s mp_wasd.var *= *var2 mp_wasd.var
  // execute if entity @s[tag=mp_wasd.invert] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
  // scoreboard players set @s[tag=mp_wasd.invert] mp_wasd.var 900
  // execute if entity @s[tag=mp_wasd.invert] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
  // tag @s[tag=mp_wasd.invert] remove mp_wasd.invert
  // execute if entity @s[tag=mp_wasd.flip] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
  // scoreboard players set @s[tag=mp_wasd.flip] mp_wasd.var 1800
  // execute if entity @s[tag=mp_wasd.flip] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
  // tag @s[tag=mp_wasd.flip] remove mp_wasd.flip
  // execute if entity @s[tag=mp_wasd.negate] run scoreboard players operation @s mp_wasd.var2 = @s mp_wasd.var
  // scoreboard players set @s[tag=mp_wasd.negate] mp_wasd.var 1800
  // execute if entity @s[tag=mp_wasd.negate] run scoreboard players operation @s mp_wasd.var -= @s mp_wasd.var2
  // scoreboard players operation @s[tag=mp_wasd.negate] mp_wasd.var *= *-1 mp_wasd.const
  // tag @s[tag=mp_wasd.negate] remove mp_wasd.negate
  // scoreboard players set @s[tag=mp_wasd.forward,scores={mp_wasd.var=-1800}] mp_wasd.var 0
  // scoreboard players set @s[tag=mp_wasd.backward,scores={mp_wasd.var=0}] mp_wasd.var 1800
  // tag @s remove mp_wasd.forward
  // tag @s remove mp_wasd.backward
  $('');
  $('atan2 approximation');
  $('atan2(x) = x(45-(x-1)(14+3.83x))');
  $('atan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000');
  $('atan2(-x) = -atan2(x)');
  $('x>1 atan2(x) = 90-atan2(1/x)');
  $('atan2(det/dot)');
})