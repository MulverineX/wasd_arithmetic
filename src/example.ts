import { execute, title } from 'sandstone/commands';
import { MCFunction, _ } from 'sandstone/core';
import { loc, Selector } from 'sandstone/variables';
import { hasLabel as is } from 'smc-label';
import get_direction, { Direction, is_mounted } from 'smc-wasd';
import { newLabel, newScore, parse_id } from './utils';

MCFunction('main', () => { execute.as('@a').at('@s').run(() => {
   const direction = {
      // 'backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right'
      arrow: [ '↓', '↙', '←', '↖', '↑', '↗', '→', '↘' ],
      bind:  [ 'S', 'AS', 'A', 'AW', 'W', 'DA', 'D', 'DS' ]
   };

   function directions(input: Direction, display: (i: number, dir: string) => string) {
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
               .positionedAs('@s').run
               .teleport('@s', loc(vector.X, 0, vector.Z));
         });
      }
   }

   const display_type = newScore('display');

   function test (type: 'mounted' | 'walking') {
      const input = get_direction(type);

      title('@s').actionbar('Still');

      _.if(is(input.moving), () => {
         _.if(display_type.equalTo(0), () => directions(input, (i, dir) => parse_id(dir)));

         _.if(display_type.equalTo(1), () => directions(input, i => direction.bind[i]));

         _.if(display_type.equalTo(2), () => directions(input, i => direction.arrow[i]));

         _.if(display_type.equalTo(3), () => {
            directions(input, (i, dir ) => `${direction.arrow[i]}; ${parse_id(dir)}; ${direction.bind[i]}`)
         });
      });
   }

   _.if(is_mounted, () => test('mounted'))

   // User settable
   .elseIf(is(newLabel('do_unmounted')), () => test('walking'));
})}, { runEachTick: true });