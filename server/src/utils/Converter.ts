export class Converter {
    public static parseBoolean = (input: string): boolean => ["true", "1", "yes", "y"].includes(input?.toLowerCase());
}
