import { execute, say } from 'sandstone/commands';
import { MCFunction } from 'sandstone/core';
import get_direction from './index';
import { hasLabel as is } from './utils';

MCFunction('test', () => {
    const direction = get_direction();

    is(direction.backward, () => say('back it up'));
})