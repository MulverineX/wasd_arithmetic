"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("sandstone/commands");
const core_1 = require("sandstone/core");
const variables_1 = require("sandstone/variables");
const utils_1 = require("./utils");
const scale = (x) => x * 1000;
function calculate(input) {
    const calculate = [utils_1.newProperty('_calc0'), utils_1.newProperty('_calc1')], absolute_rotation = input.absolute.rotation, vec_x = input.absolute.vector.X, vec_z = input.absolute.vector.Z;
    const math = core_1.MCFunction('_wasd/calculate', () => {
        commands_1.comment('# Get Rotation');
        commands_1.execute.store.result.score(absolute_rotation).runOne.
            data.get.entity('@s', 'Rotation[0]', 1000);
        commands_1.scoreboard.players.add(`@s[scores={${absolute_rotation.objective.name}=..0}]`, absolute_rotation.objective, scale(360));
        const negate = utils_1.newLabel('_negate');
        commands_1.comment('# Calculate rotation vector');
        calculate[0].set(absolute_rotation);
        const sine = () => {
            commands_1.comment("Calculate sine using Bhaskara I's approx.");
            core_1._.if(calculate[0].greaterOrEqualThan(scale(180)), () => { utils_1.addLabel(negate); });
            utils_1.hasLabel(negate, () => calculate[0].remove(scale(180)));
            calculate[1].set(scale(180))
                .remove(calculate[0]).divide(1000)
                .multiply(calculate[0]);
            calculate[0].set(scale(40500))
                .remove(calculate[1]);
            calculate[1].multiply(4);
            calculate[0].divide(1000);
            calculate[1].divide(calculate[0]);
            utils_1.hasLabel(negate, () => calculate[1].multiply(-1));
            utils_1.removeLabel(negate);
        };
        sine();
        commands_1.comment('');
        const dxrot = calculate[0].objective.ScoreHolder('dxrot'), dzrot = calculate[0].objective.ScoreHolder('dzrot');
        dxrot.set(calculate[1]);
        dxrot.multiply(-1);
        calculate[0].set(absolute_rotation);
        commands_1.comment('');
        commands_1.comment('Calculate cosine ~ `cos(x)=sin(x+90)`');
        calculate[0].add(scale(90));
        sine();
        commands_1.comment('');
        dzrot.set(calculate[1]);
        const temp = [calculate[0].objective.ScoreHolder('temp0'), calculate[0].objective.ScoreHolder('temp1')];
        commands_1.comment('# Calculate dot product');
        calculate[0].set(vec_z);
        temp[0].set(vec_x);
        calculate[0].multiply(dxrot);
        temp[0].multiply(dzrot);
        calculate[0].remove(temp[0]);
        calculate[0].multiply(10);
        core_1._.if(calculate[0].lowerOrEqualThan(-1), () => utils_1.addLabel(negate));
        commands_1.comment('# Calculate determinant');
        calculate[1].set(vec_x);
        temp[0].set(vec_z);
        calculate[1].multiply(dxrot);
        temp[0].multiply(dzrot);
        calculate[1].add(temp[0]);
        commands_1.comment('');
        core_1._.if(calculate[1].greaterOrEqualThan(1), () => utils_1.addLabel(input.forward))
            .elseIf(calculate[1].lowerOrEqualThan(-1), () => utils_1.addLabel(input.backward));
        commands_1.comment('# Calculate Local Rotation');
        commands_1.comment('Calculate arc tangent (atan2)');
        calculate[0].divide(calculate[1]);
        const flip = utils_1.newLabel('_flip');
        core_1._.if(calculate[0].lowerOrEqualThan(-1), () => utils_1.addLabel(flip));
        utils_1.hasLabel(flip, () => calculate[0].multiply(-1));
        const invert = utils_1.newLabel('_invert');
        core_1._.if(calculate[0].greaterOrEqualThan(11), () => utils_1.addLabel(invert));
        utils_1.hasLabel(invert, () => {
            calculate[1].set(calculate[0]);
            calculate[0].set(100).divide(calculate[1]);
        });
        temp[0].set(calculate[0]).remove(10);
        temp[1].set(calculate[0]).divide(100).multiply(383).add(140).divide(100);
        temp[0].multiply(temp[1]);
        temp[1].set(450)
            .remove(temp[0]).divide(10);
        calculate[0].multiply(temp[1]);
        utils_1.hasLabel(invert, () => {
            calculate[1].set(calculate[0]);
            calculate[0].set(900)
                .remove(calculate[1]);
        });
        utils_1.hasLabel(flip, () => {
            calculate[1].set(calculate[0]);
            calculate[0].set(1800)
                .remove(calculate[1]);
        });
        utils_1.hasLabel(negate, () => {
            calculate[1].set(calculate[0]);
            calculate[0].set(1800)
                .remove(calculate[1]).multiply(-1);
        });
        commands_1.scoreboard.players.set(variables_1.Selector('@s', {
            tag: input.forward.raw_name,
            scores: { [calculate[0].objective.name]: -1800 }
        }), calculate[0].objective, 0);
        commands_1.scoreboard.players.set(variables_1.Selector('@s', {
            tag: input.backward.raw_name,
            scores: { [calculate[0].objective.name]: 0 }
        }), calculate[0].objective, 1800);
        utils_1.removeLabel(flip);
        utils_1.removeLabel(invert);
        utils_1.removeLabel(negate);
        utils_1.removeLabel(input.forward);
        utils_1.removeLabel(input.backward);
        commands_1.comment('');
        commands_1.comment('atan2 approximation');
        commands_1.comment('atan2(x) = x(45-(x-1)(14+3.83x))');
        commands_1.comment('atan2(1000x) = (1000x(45000-((1000x-1000)(14000+3.83*1000x))/1000))/1000/1000');
        commands_1.comment('atan2(-x) = -atan2(x)');
        commands_1.comment('x>1 atan2(x) = 90-atan2(1/x)');
        commands_1.comment('atan2(det/dot)');
    });
    math();
    return calculate[0];
}
exports.default = calculate;
