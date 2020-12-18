/**
 * Label tag (/tag) handler
 */
export declare class Label {
    /**
     * Label name
     */
    name: string;
    /**
     * Full Tag Name
     */
    raw_name: string;
    /**
     * Selector to test for label, ie. `execute.as(foo.test())`
     */
    test: import("sandstone/variables").SelectorClass<true, true>;
    constructor(name: string);
}
/**
 * Creates a new label
 * @param label Label/tag name
 */
export declare function newLabel(label: string): Label;
/**
 * Adds label to `@s`
 * @param label Label
 */
export declare function addLabel(label: Label): void;
/**
 * Removes label from `@s`
 * @param label Label
 */
export declare function removeLabel(label: Label): void;
/**
 * Removes label from `@s`
 * @param label Label
 * @param run Function to run
 */
export declare function hasLabel(label: Label, run: () => void): void;
/**
 * Creates an objective that defaults to dummy returning the score for `@s`
 * @param name Objective name
 * @param type Objective type
 */
export declare function newProperty(name: string, type?: string): import("sandstone/variables").PlayerScore;
/**
 * Parses an id into a header (capitalizes and spaces)
 * @param s id to parse
 */
export declare function parse_id(s: string): string;
