import { comment as $, execute, scoreboard } from 'sandstone/commands';
import { MCFunction, _ } from 'sandstone/core';
import { Selector } from 'sandstone/variables';
import { absolute_rotation, input_directions, vec_x, vec_z } from '.';
import { newProperty, newLabel, addLabel, removeLabel, hasLabel as is } from './utils';

const scale = (x: number) => x*1000;

export default MCFunction('_wasd/calculate', () => {
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

    calculate[1].set(scale(180))
                .remove(calculate[0]).divide(1000)
                .multiply(calculate[0]);

    calculate[0].set(scale(40500))
                .remove(calculate[1]);

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

  const temp = [ calculate[0].objective.ScoreHolder('temp0'), calculate[0].objective.ScoreHolder('temp1') ];

  $('# Calculate dot product');
  calculate[0].set(vec_z);
  temp[0].set(vec_x);

  calculate[0].multiply(dxrot);
  temp[0].multiply(dzrot);
  calculate[0].remove(temp[0]);

  calculate[0].multiply(10);
  _.if(calculate[0].lowerOrEqualThan(-1), () => addLabel(negate));

  $('# Calculate determinant')
  temp[0].set(vec_z);
  calculate[1].set(vec_x)

  calculate[1].multiply(dxrot);
  temp[0].multiply(dzrot);
  calculate[1].add(temp[0]);

  _.if(calculate[1].greaterOrEqualThan(1), () => addLabel(input_directions.forward))

  .elseIf(calculate[1].lowerOrEqualThan(-1), () => addLabel(input_directions.backward))

  $('# Calculate Local Rotation')
  $('Calculate arc tangent (atan2)')
  calculate[0].divide(calculate[1])

  const flip = newLabel('_flip');
  _.if(calculate[0].lowerOrEqualThan(-1), () => addLabel(flip));

  is(flip, () => calculate[0].multiply(-1));

  const invert = newLabel('_invert');
  _.if(calculate[0].greaterOrEqualThan(11), () => addLabel(invert));

  is(invert, () => {
    calculate[1].set(calculate[0]);
    
    calculate[0].multiply(100)
                .divide(calculate[1]);
  });

  temp[0].set(calculate[0]).remove(10);

  temp[1].set(calculate[0]).divide(100).multiply(383).add(140).divide(100);

  temp[0].multiply(temp[1]);

  temp[1].set(450)
         .remove(temp[0]).divide(10);

  calculate[0].multiply(temp[1]);

  is(invert, () => {
    calculate[1].set(calculate[0]);

    calculate[0].set(900)
                .remove(calculate[1]);
  })

  is(flip, () => {
    calculate[1].set(calculate[0]);

    calculate[0].set(1800)
                .remove(calculate[1]);
  })

  is(negate, () => {
    calculate[1].set(calculate[0]);

    calculate[0].set(1800)
                .remove(calculate[1]).multiply(-1);
  })

  scoreboard.players.set(Selector('@s', {
      tag: input_directions.forward.raw_name,
      scores: { [calculate[0].objective.name]: -1800 }
    }), 
    calculate[0].objective, 0
  );

  scoreboard.players.set(Selector('@s', {
      tag: input_directions.backward.raw_name,
      scores: { [calculate[0].objective.name]: 0 }
    }), 
    calculate[0].objective, 1800
  );

  removeLabel(flip);
  removeLabel(invert);
  removeLabel(negate);
  removeLabel(input_directions.forward);
  removeLabel(input_directions.backward);
  $('');
  $('atan2 approximation');
  $('atan2(x) = x(45-(x-1)(14+3.83x))');
  $('atan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000');
  $('atan2(-x) = -atan2(x)');
  $('x>1 atan2(x) = 90-atan2(1/x)');
  $('atan2(det/dot)');
})