declare const directions: readonly ["backward", "backward_left", "left", "forward_left", "forward", "forward_right", "right", "backward_right"];
/**
 * The directions the player is inputting.
 */
export declare class Direction {
    /**
     * Exclusive direction score
     */
    score: import("sandstone/variables").PlayerScore;
    /**
     * Absolute values
     */
    absolute: {
        /**
         * Absolute Rotation normalized to 0-360(000)
         */
        rotation: import("sandstone/variables").PlayerScore;
        /**
         * Absolute X & Z Motion vector
         */
        vector: {
            X: import("sandstone/variables").PlayerScore;
            Z: import("sandstone/variables").PlayerScore;
        };
    };
    /**
     * Absolute Rotation normalized to 0-360(000)
     */
    local_rotation: import("sandstone/variables").PlayerScore;
    moving: import("./utils").Label;
    /**
     * The 8 possible directions
     */
    directions: readonly ["backward", "backward_left", "left", "forward_left", "forward", "forward_right", "right", "backward_right"];
    /**
     * The 4 cardinal directions
     */
    cardinals: readonly ["backward", "left", "forward", "right"];
    /**
     * Whether the player is inputting forward
     */
    forward: import("./utils").Label;
    /**
     * Whether the player is inputting backward
     */
    backward: import("./utils").Label;
    /**
     * Whether the player is inputting left
     */
    left: import("./utils").Label;
    /**
     * Whether the player is inputting right
     */
    right: import("./utils").Label;
    /**
     * The 4 dual/diagonal directions
     */
    diagonals: readonly ["backward_left", "forward_left", "forward_right", "backward_right"];
    /**
     * Check for an exclusive direction the player is inputting
     * @param dir Direction to check for
     */
    exact(direction: typeof directions[number]): import("sandstone/_internals").ConditionClass;
    /**
     * Gives static values for a local vector
     * @param dir Direction to get a vector for, number 0-7
     * @param magnitude Multiplier for values
     */
    local_vector(direction: typeof directions[number] | number, magnitude?: number): {
        Z: number;
        X: number;
    };
}
export declare const is_mounted: import("sandstone/_internals/resources").Predicate;
export default function get_input(): Direction;
export {};
