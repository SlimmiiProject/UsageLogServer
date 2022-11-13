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
    "shop@email.stackcommerce.com",
    "customer/department=shipping@example.com",
    "$A12345@example.com",
    "!def!xyz%abc@example.com",
    "_somename@example.com"
]
const failingEmails = [
    "personsnames.ColdMail.com",
    "abc@@abd.Museums",
    "abcabd.Museums"
]

const passingPhoneNumbers = [
    "+32491304548",
    "+32472526864",
    "+32475796013",
    "+32482645345",
    "+32478525008",
    "+32471286085",
    "+32499350093",
    "+32486835965",
]
const failingPhoneNumbers = [
    "+3249130454",
    "+3247252686A",
    "-32475796013",
    "+42482645345",
    "+39478525008",
    "+32571286085",
    "+32399350093",
    "+324186835965"
]
const passingAlphabet = [
    "abcd",
    "ABCD",
    "ABDË",
    "Äbdce",
    "abcëd",
    "abdê",
    "bjørk",
]
const failingAlphabet = [
    "bj0rk",
    "abc1d",
    "ab:c",
    "ab-c",
    "@bcd",
    "ab&cd",
    "ab|cd",
]
test("Base64 Regex works correctly", () => {
    values.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeTruthy());
    badValues.forEach((b) => expect(RegExpVal.validate(b, RegExpVal.base64Encoded)).toBeFalsy());
});

test("email Validators work correctly", () => {
    passingEmails.forEach((passingValue) => expect(RegExpVal.validate(passingValue, RegExpVal.emailValidator)).toBeTruthy());
    failingEmails.forEach((failingValue) => expect(RegExpVal.validate(failingValue, RegExpVal.emailValidator)).toBeFalsy());
})

test("phone number validadors work correctly", () => {
    passingPhoneNumbers.forEach((passingValue) => expect(RegExpVal.validate(passingValue, RegExpVal.phoneValidator)).toBeTruthy())
    failingPhoneNumbers.forEach((failingValue) => expect(RegExpVal.validate(failingValue, RegExpVal.phoneValidator)).toBeFalsy())
})

test("alphabet validators work correctly", () => {
    passingAlphabet.forEach((passingValue) => expect(RegExpVal.validate(passingValue, RegExpVal.alphabetValidator)).toBeTruthy())
    failingAlphabet.forEach((failingValue) => expect(RegExpVal.validate(failingValue, RegExpVal.alphabetValidator)).toBeFalsy())
})