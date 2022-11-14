import { Crypt } from "../utils/Crypt";
import { RegExpVal } from "../utils/RegexValidator";

const encryptCases = ["123456789", "Slimmii"];

test("Encrypt returns base64", () => encryptCases.forEach((eC) => expect(RegExpVal.base64Encoded.test(Crypt.encrypt(eC))).toBeTruthy()));

test("Decrypt returns correct hash", () => {
    const encrypted: Map<string, string> = new Map();
    encryptCases.forEach((eC) => encrypted.set(eC, Crypt.encrypt(eC)));
    encrypted.forEach((v, k) => expect(Crypt.matchesEncrypted(k, v)).toBeTruthy());
});