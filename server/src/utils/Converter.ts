export class Converter {

    public static parseBoolean(input: string | undefined): boolean {
        return input && JSON.parse(input);
    }
}