

export class RegExpVal {

    // TODO Fill in RegEx
    public static readonly phoneValidator = new RegExp('');
    public static readonly emailValidator = new RegExp('');
    public static readonly alphabetValidator = new RegExp('');
    public static readonly base64Encoded = new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$');

    /**
     * It takes a string and a regular expression as input and returns true if the string matches the
     * regular expression.
     * @param {string} input - The string to validate.
     * @param {RegExp} validator - A regular expression that will be used to validate the input.
     * @returns A boolean value.
     */
    public static validate(input: string, validator: RegExp): boolean {
        return validator.test(input);
    }

    /**
     * "The function takes an input and an array of validators, and returns true if all the validators
     * return true for the input."
     * 
     * @param {string} input - The input string to validate
     * @param {RegExp[]} validators - An array of regular expressions.
     * @returns Outcome of validator iteration.
     */
    public static validateAllOn(input: string, validators: RegExp[]): boolean {
        return validators.every((validator) => this.validate(input, validator));
    }
}
