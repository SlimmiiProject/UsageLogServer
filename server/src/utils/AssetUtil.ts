import path from "path";

export class AssetUtil {
    public static getPath = (resource:string) => path.join("assets", resource);
}