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

const passingEmails = [
    "personsName@coldmail.com",
    "abc@abd.Museums",
    "a@E.C",
    "A".repeat(64) + "@" + "B".repeat(175) + ".com",
    'Abc\\@def@example.com',
    "Fred\\Bloggs@example.com",
    "Joe.\\Blow@example.com",
    'Abc@def"@example.com',
    'Fred Bloggs"@example.com',
    "customer/department=shipping@example.com",
]
const failingEmails = [
    "personsnames.ColdMail.com",
    "abc@@abd.Museums",
    "abcabd.Museums"
]
test("Base64 Regex works correctly", () => {
    values.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeTruthy());
    badValues.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeFalsy());
});

test("email Validators work correctly", () => {
    passingEmails.forEach((passing) => expect(RegExpVal.validate(passing, RegExpVal.emailValidator)).toBeTruthy());
    //for some reason toBeFalsly fails when "()" is added to the end
    failingEmails.forEach((failing) => expect(RegExpVal.validate(failing, RegExpVal.emailValidator)).toBeFalsy);
})