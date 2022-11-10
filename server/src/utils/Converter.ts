export class Converter {

    public static parseBoolean(input: string): boolean {
        return ["true", "1", "yes", "y"].includes(input?.toLowerCase());
    }
}