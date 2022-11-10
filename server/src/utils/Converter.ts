export class Converter {

    public static parseBoolean(input: string | undefined): boolean {
        return ["true", "1", "yes", "y"].includes(input.toLowerCase());
    }
}