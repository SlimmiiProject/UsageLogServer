export class MathUtil {

    /**
     * If the input is less than the minimum, return the minimum. If the input is greater than the
     * maximum, return the maximum. Otherwise, return the input.
     * @param {number} input - The number to clamp.
     * @param {number} minimum - The minimum value that the input can be.
     * @param {number} maximum - The maximum value that the input can be.
     * @returns Value between or equal to minimum and maximum
     */
    public static clamp(input: number, minimum: number, maximum: number): number {
        return Math.min(Math.max(input, minimum), maximum);
    }

    
}