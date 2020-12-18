import { execute, title } from 'sandstone/commands';
import { MCFunction, _ } from 'sandstone/core';
import { loc, Selector } from 'sandstone/variables';
import get_direction from '.';
import { hasLabel as is, newProperty, parse_id } from './utils';

MCFunction('test', () => {
   const input = get_direction();

   title('@s').actionbar('');

   is(input.moving, () => {
      const direction = {
         arrow: [ '↓', '←', '↑', '→' ],
         bind:  [ 'S', 'A', 'W', 'D' /* uuude? */ ]
      }

      const display_type = newProperty('display');

      function directions(display: (i: number, dir: string) => string) {
         for (const [ i, dir ] of input.directions.entries()) {

            _.if(input.exact(dir), () => title('@s').actionbar(display(i, dir)));

            const vector = input.local_vector(dir, 0.05);

            execute.rotated(['~', '0']).as(Selector('@e', { type: 'minecraft:minecart', distance: [0, .5], limit: 1, sort: 'nearest' })).runOne
               .teleport('@s', loc(vector.X, 0, vector.Z));
         }
      }

      _.if(display_type.equalTo(0), () => directions((i, dir) => parse_id(dir)));
        
      _.if(display_type.equalTo(1), () => directions(i => direction.bind[i]));

      _.if(display_type.equalTo(2), () => directions(i => direction.arrow[i]));

      _.if(display_type.equalTo(3), () => {
         directions((i, dir ) => `${direction.arrow[i]}; ${parse_id(dir)}; ${direction.bind[i]}`)
      });
   })
})