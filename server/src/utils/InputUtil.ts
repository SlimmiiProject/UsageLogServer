export class InputUtil {

    public static isSet(input:string):boolean {
        return !([null, undefined, false, ""].includes(input));
    }
}