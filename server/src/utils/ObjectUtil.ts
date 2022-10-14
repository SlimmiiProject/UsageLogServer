export class ObjectUtil {


    public static firstNonUndefined(objects:any[]): any {
        objects.forEach((object) => {
            if(object !== undefined && object !== null) return object;
        });

        return undefined;
    }
}