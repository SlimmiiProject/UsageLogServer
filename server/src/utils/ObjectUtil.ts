export class ObjectUtil {

    public static firstNonUndefined(objects:any[]): any {
        return objects.find((object) => object !== undefined && object !== null);
    }
}