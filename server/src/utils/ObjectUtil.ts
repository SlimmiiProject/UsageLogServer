export class ObjectUtil {

   /**
    * It returns the first non-undefined value in an array of objects
    * @param {T[]} objects - T[] - An array of objects of type T.
    * @returns The first non-undefined value in the array.
    */
    public static firstNonUndefined<T>(objects:T[]): T {
        return objects.find((object) => object !== undefined && object !== null);
    }
}