export class InputUtil {

    public static isSet(input:string):boolean {
        return !([undefined, false, ""].includes(input));
    }
}