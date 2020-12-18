"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_mounted = exports.Direction = void 0;
const tslib_1 = require("tslib");
const commands_1 = require("sandstone/commands");
const core_1 = require("sandstone/core");
const calculate_1 = tslib_1.__importDefault(require("./calculate"));
const utils_1 = require("./utils");
const directions = ['backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right'];
/**
 * The directions the player is inputting.
 */
class Direction {
    constructor() {
        /**
         * Exclusive direction score
         */
        this.score = utils_1.newProperty('loc_dir');
        /**
         * Absolute values
         */
        this.absolute = {
            /**
             * Absolute Rotation normalized to 0-360(000)
             */
            rotation: utils_1.newProperty('abs_rot'),
            /**
             * Absolute X & Z Motion vector
             */
            vector: {
                X: utils_1.newProperty('vec_x'),
                Z: utils_1.newProperty('vec_z')
            }
        };
        /**
         * Absolute Rotation normalized to 0-360(000)
         */
        this.local_rotation = utils_1.newProperty('loc_rot');
        this.moving = utils_1.newLabel('is_moving');
        /**
         * The 8 possible directions
         */
        this.directions = directions;
        /**
         * The 4 cardinal directions
         */
        this.cardinals = [directions[0], directions[2], directions[4], directions[6]];
        /**
         * Whether the player is inputting forward
         */
        this.forward = utils_1.newLabel(this.cardinals[2]);
        /**
         * Whether the player is inputting backward
         */
        this.backward = utils_1.newLabel(this.cardinals[0]);
        /**
         * Whether the player is inputting left
         */
        this.left = utils_1.newLabel(this.cardinals[1]);
        /**
         * Whether the player is inputting right
         */
        this.right = utils_1.newLabel(this.cardinals[3]);
        /**
         * The 4 dual/diagonal directions
         */
        this.diagonals = [directions[1], directions[3], directions[5], directions[7]];
    }
    /**
     * Check for an exclusive direction the player is inputting
     * @param dir Direction to check for
     */
    exact(direction) {
        return this.score.equalTo(directions.findIndex(x => x === direction) + 1);
    }
    /**
     * Gives static values for a local vector
     * @param dir Direction to get a vector for, number 0-7
     * @param magnitude Multiplier for values
     */
    local_vector(direction, magnitude = 1) {
        const full = 1 * magnitude;
        const diag = Math.sqrt(full ** 2) / 2;
        // 'backward', 'backward_left', 'left', 'forward_left', 'forward', 'forward_right', 'right', 'backward_right'
        switch (typeof direction === 'number' ? direction : directions.findIndex(x => x === direction)) {
            case 0: return { Z: full * -1, X: 0 };
            case 1: return { Z: diag * -1, X: diag };
            case 2: return { Z: 0, X: full };
            case 3: return { Z: diag, X: diag };
            case 4: return { Z: full, X: 0 };
            case 5: return { Z: diag, X: diag * -1 };
            case 6: return { Z: 0, X: full * -1 };
            case 7: return { Z: diag * -1, X: diag * -1 };
            default: return { Z: 0, X: 0 }; // TypeScript moment
        }
    }
}
exports.Direction = Direction;
const input = new Direction();
const main = core_1.MCFunction('_wasd/get_input', () => {
    commands_1.comment('Clear flags');
    input.score.set(0);
    utils_1.removeLabel(input.forward);
    utils_1.removeLabel(input.backward);
    utils_1.removeLabel(input.left);
    utils_1.removeLabel(input.right);
    utils_1.removeLabel(input.moving);
    const vec_x = input.absolute.vector.X, vec_z = input.absolute.vector.Z;
    commands_1.comment('Store motion to scores for access');
    commands_1.execute.store.result.score(vec_x).runOne.
        data.get.entity('@s', 'Motion[0]', 1000);
    commands_1.execute.store.result.score(vec_z).runOne.
        data.get.entity('@s', 'Motion[2]', 1000);
    commands_1.comment('Ensure there is motion');
    commands_1.execute.unlessScore('@s', vec_x.objective, 'matches', 0).runOne.raw('tag @s add mountedwasd.is_moving');
    commands_1.execute.unlessScore('@s', vec_z.objective, 'matches', 0).runOne.raw('tag @s add mountedwasd.is_moving');
    commands_1.comment('Run calculations & output');
    utils_1.hasLabel(input.moving, () => {
        const local_rotation = calculate_1.default(input);
        let angle = -180.0;
        let alt = false;
        commands_1.comment('# Exclusive Inputs');
        commands_1.comment('Backward');
        commands_1.raw(`execute if score @s ${local_rotation.objective.name} matches 1574..1800 run`, `scoreboard players set @s ${input.score.objective.name} 1`);
        for (let i in input.directions) { // Deepscan: TypeScript Moment.
            const first = i == '0';
            if (!first)
                commands_1.comment(utils_1.parse_id(input.directions[i]));
            const angle_a = angle + (first ? 0 : (alt ? -.1 : .1));
            angle += first ? 22.5 : 45;
            const angle_b = angle + (i == '7' ? .1 : (alt ? -.1 : .1));
            const score = parseInt(i) + 1;
            commands_1.raw(`execute if score @s ${local_rotation.objective.name} matches ${angle_a * 10}..${angle_b * 10} run`, `scoreboard players set @s ${input.score.objective.name} ${score}`);
            alt = !alt;
        }
        commands_1.comment('');
        commands_1.comment('# Inclusive Inputs');
        commands_1.comment('Backward');
        const backward = `tag @s add ${input.backward.raw_name}`;
        commands_1.raw(`execute if score @s ${input.score.objective.name} matches 8 run`, backward);
        commands_1.raw(`execute if score @s ${input.score.objective.name} matches 1..2 run`, backward);
        let num = 2;
        for (const cardinal of input.cardinals.slice(1).map(x => input[x])) {
            commands_1.comment(utils_1.parse_id(cardinal.name));
            commands_1.raw(`execute if score @s ${input.score.objective.name} matches ${num}..${num + 2} run`, `tag @s add ${cardinal.raw_name}`);
            num += 2;
        }
    });
});
exports.is_mounted = core_1.Predicate('is_mounted', {
    condition: 'minecraft:entity_properties',
    entity: 'this',
    predicate: {
        nbt: '{RootVehicle:{}}'
    }
});
function get_input() {
    main();
    return input;
}
exports.default = get_input;
