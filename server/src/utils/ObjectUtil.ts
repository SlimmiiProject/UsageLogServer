export class ObjectUtil {

    /**
     * It returns the first non-undefined value in an array of objects
     * @param {T[]} objects - T[] - An array of objects of type T.
     * @returns The first non-undefined value in the array.
     */
    public static firstNonUndefined<T>(objects: T[]): T {
        return objects.find((object) => object !== undefined && object !== null);
    }

   /**
    * It returns true if the input is not null, undefined, false, or an empty string
    * @param {any} input - The input to check if it's set.
    * @returns a boolean value.
    */
    public static isSet(input: any): boolean {
        return !([null, undefined, false, ""].includes(input));
    }
}