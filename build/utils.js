"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse_id = exports.newProperty = exports.hasLabel = exports.removeLabel = exports.addLabel = exports.newLabel = exports.Label = void 0;
const commands_1 = require("sandstone/commands");
const variables_1 = require("sandstone/variables");
const namespace = {
    full: 'mountedwasd',
    short: 'mtwasd'
};
/**
 * Label tag (/tag) handler
 */
class Label {
    constructor(name) {
        this.name = name;
        this.raw_name = `${namespace.full}.${name}`;
        this.test = variables_1.Selector('@s', { tag: this.raw_name });
    }
}
exports.Label = Label;
/**
 * Creates a new label
 * @param label Label/tag name
 */
function newLabel(label) {
    return new Label(label);
}
exports.newLabel = newLabel;
/**
 * Adds label to `@s`
 * @param label Label
 */
function addLabel(label) {
    commands_1.tag('@s').add(label.raw_name);
}
exports.addLabel = addLabel;
/**
 * Removes label from `@s`
 * @param label Label
 */
function removeLabel(label) {
    commands_1.tag('@s').remove(label.raw_name);
}
exports.removeLabel = removeLabel;
/**
 * Removes label from `@s`
 * @param label Label
 * @param run Function to run
 */
function hasLabel(label, run) {
    commands_1.execute.as(label.test).run(run);
}
exports.hasLabel = hasLabel;
/**
 * Creates an objective that defaults to dummy returning the score for `@s`
 * @param name Objective name
 * @param type Objective type
 */
function newProperty(name, type = 'dummy') {
    return variables_1.createObjective(`${namespace.short}.${name}`, type).ScoreHolder('@s');
}
exports.newProperty = newProperty;
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
/**
 * Parses an id into a header (capitalizes and spaces)
 * @param s id to parse
 */
function parse_id(s) {
    let strings = false;
    if (s.includes('_')) {
        strings = [];
        for (const str of s.split('_')) {
            strings.push(capitalize(str));
        }
        ;
    }
    return strings ? strings.join(' ') : capitalize(s);
}
exports.parse_id = parse_id;
