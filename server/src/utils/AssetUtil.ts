import path from "path";

export class AssetUtil {
    public static getPath(resource:string) {
        return path.join("assets", resource);
    }
}