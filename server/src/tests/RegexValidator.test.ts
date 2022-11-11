import { RegExpVal } from "../utils/RegexValidator";

const values = [
    "QW5kaWUgaXMgZWVuIGxldWtlIGxlY3Rvcg==",
    "V2h5IHlvdSBwZWVraW5nPw==",
    "V2hhdCBhbSBpIGRvaW5nPw==",
    "SGVsbG8gZnJvbSBFbHd5biE=",
    "TEdCVFErICA8Mw=="
];

const badValues = [
    "QnJaswva2Vu",
    "VWdoIasFVuaXRz"
] 

test("Base64 Regex works correctly", () => {
    values.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeTruthy());
    badValues.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeFalsy());
});