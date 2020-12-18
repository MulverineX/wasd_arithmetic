import { execute, tag } from "sandstone/commands";
import { createObjective, Selector } from "sandstone/variables";

const namespace = {
  full: 'mtwasd_test',
  short: 'mtwasdt' 
};

/**
 * Label tag (/tag) handler
 */
export class Label {
  /**
   * Label name
   */
  public name;

  /**
   * Full Tag Name
   */
  public raw_name;

  /**
   * Selector to test for label, ie. `execute.as(foo.test())`
   */
  public test;

  constructor (name: string) {
    this.name = name;
    this.raw_name = `${namespace.full}.${name}`;

    this.test = Selector('@s', { tag: this.raw_name });
  }
}

/**
 * Creates a new label
 * @param label Label/tag name
 */
export function newLabel(label: string) {
  return new Label(label);
}

/**
 * Adds label to `@s`
 * @param label Label
 */
export function addLabel(label: Label) {
  tag('@s').add(label.raw_name)
}

/**
 * Removes label from `@s`
 * @param label Label
 */
export function removeLabel(label: Label) {
  tag('@s').remove(label.raw_name)
}

/**
 * Removes label from `@s`
 * @param label Label
 * @param run Function to run
 */
export function hasLabel(label: Label, run: () => void) {
  execute.as(label.test).run(run);
}

/**
 * Creates an objective that defaults to dummy returning the score for `@s`
 * @param name Objective name
 * @param type Objective type
 */
export function newProperty (name: string, type = 'dummy') {
  return createObjective(`${namespace.short}.${name}`, type).ScoreHolder('@s');
}

function capitalize (s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Parses an id into a header (capitalizes and spaces)
 * @param s id to parse
 */
export function parse_id (s: string) {
  let strings: String[] | boolean = false;
  
  if (s.includes('_')) {
    strings = [];
    for (const str of s.split('_')) {
      strings.push(capitalize(str));
    };
  }
  return strings ? strings.join(' ') : capitalize(s);
}