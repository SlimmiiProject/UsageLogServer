import { Converter } from "../utils/Converter";

const trueValues = ["y", "yes", "1", "true"];
const falseValues = ["n", "incorrect", "0", "false"];

test("parseBoolean returns correct value", () => {
    trueValues.forEach((v) => expect(Converter.parseBoolean(v)).toBeTruthy());
    falseValues.forEach((v) => expect(Converter.parseBoolean(v)).toBeFalsy());
});