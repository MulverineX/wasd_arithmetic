import { tag } from "sandstone/commands";
import { createObjective, Selector } from "sandstone/variables";

/**
 * Label tag (/tag) handler
 */
export class Label {
  /**
   * The Label
   */
  public name;

  constructor (name: string) { this.name = `mountedwasd.${name}` }

  /**
   * Selector to test for label, ie. `execute.as(foo.test())`
   */
  public test() {
    return Selector('@s', { tag: this.name });
  }
}

/**
 * Creates a new label
 */
export function newLabel(label: string) {
  return new Label(label);
}

/**
 * Adds label to `@s`
 */
export function addLabel(label: Label) {
  tag('@s').add(label.name)
}

/**
 * Removes label from `@s`
 */
export function removeLabel(label: Label) {
  tag('@s').remove(label.name)
}

export function newProperty (objective: string, type = 'dummy') {
  return createObjective(`mtwasd.${objective}`, type).ScoreHolder('@s');
}