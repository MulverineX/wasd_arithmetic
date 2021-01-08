import { createObjective } from "sandstone/variables";
import { createLabel } from "smc-label";

const namespace = { full: 'wasd', short: 'wasd' };

/**
 * Creates a new label
 * @param label Label/tag name
 */
export function newLabel(label: string) {
  return createLabel(`${namespace.full}.${label}`);
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