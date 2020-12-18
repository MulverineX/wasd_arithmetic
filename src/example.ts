import { execute, title } from 'sandstone/commands';
import { MCFunction, _ } from 'sandstone/core';
import { loc, Selector } from 'sandstone/variables';
import get_direction, { is_mounted } from 'smc-mountedwasd';
import { hasLabel as is, newProperty, parse_id } from './utils';

MCFunction('test', () => { _.if(is_mounted, () => {
   const input = get_direction();

   title('@s').actionbar('');

   is(input.moving, () => {
      const direction = {
         // 'backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right'
         arrow: [ '↓', '↙', '←', '↖', '↑', '↗', '→', '↘' ],
         bind:  [ 'S', 'AS', 'A', 'AW', 'W', 'DA', 'D', 'DS' ]
      };

      const display_type = newProperty('display');

      function directions(display: (i: number, dir: string) => string) {
         for (const [ i, dir ] of input.directions.entries()) {

            _.if(input.exact(dir), () => {
               title('@s').actionbar({ text: display(i, dir), color: 'gold', bold: true });

               const vector = input.local_vector(dir, 0.25);

               execute.rotated(['~', '0']).as(Selector('@e', { 
                     type: 'minecraft:minecart', 
                     distance: [0, .5], 
                     limit: 1, 
                     sort: 'nearest'
                  }))
                  .positionedAs('@s').runOne
                  .teleport('@s', loc(vector.X, 0, vector.Z));
            });
         }
      }

      _.if(display_type.equalTo(0), () => directions((i, dir) => parse_id(dir)));
      
      _.if(display_type.equalTo(1), () => directions(i => direction.bind[i]));

      _.if(display_type.equalTo(2), () => directions(i => direction.arrow[i]));

      _.if(display_type.equalTo(3), () => {
         directions((i, dir ) => `${direction.arrow[i]}; ${parse_id(dir)}; ${direction.bind[i]}`)
      });
   });
})}, { runEachTick: true });