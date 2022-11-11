export class InputUtil {

    /**
     * If the input is not undefined, false, or an empty string, then return true
     * @param {string} input - The input to check if it's set.
     * @returns The return value is a boolean.
     */
    public static isSet(input: string): boolean {
        return !([undefined, false, ""].includes(input));
    }
}