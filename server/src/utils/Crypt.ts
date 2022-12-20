import bcrypt from "bcrypt";
import { TextEncoder } from "util";

/**
 * Encryption with 4 steps, BCrypt, Bytes, XOR, Base64
 */
export class Crypt {

    private static get saltRounds() { return 10; }

    /**
     * It takes a raw string and an encrypted string, decrypts the encrypted string, and then compares
     * the two strings
     * @param {string} rawContent - The raw content that you want to compare to the encrypted content.
     * @param {string} encryptedContent - The encrypted content that you want to compare against.
     * @returns The encrypted content is being returned.
     */
    public static matchesEncrypted = (rawContent: string, encryptedContent: string): boolean => this.compare(rawContent, encryptedContent);

    private static compare = (raw: string, encryptedHash: string) => bcrypt.compareSync(raw, this.decryptToHash(encryptedHash));

    /**
     * "Create an array of length `length` and reduce it to a string by adding a random character to it
     * for each iteration."
     * @param {number} length - number - The length of the password to generate.
     * @returns A string of random characters.
     */
    public static createRandomPassword = (length: number): string =>
        [...new Array(length).keys()].reduce((password) => password + String.fromCharCode(Math.floor(Math.random() * 128)), "");

    public static createUrlSafeHash = (length: number): string =>
        this.toHex(this.toBytes(this.createRandomPassword(length)));

    public static encrypt = (content: string): string => {
        const hashedInput = bcrypt.hashSync(content, this.saltRounds);
        const bytesInput = this.toBytes(hashedInput);
        const xorInput = this.xor(bytesInput);
        return this.toBase64(xorInput);
    }

    public static decryptToHash = (encryped: string): string => {
        const decryptedB64 = this.fromBase64(encryped);
        const decryptedXOR = this.xor(decryptedB64);
        const decryptedBytes = this.fromBytes(decryptedXOR);
        return decryptedBytes;
    }

    private static toBytes = (content: string): Uint8Array => new TextEncoder().encode(content);

    private static fromBytes = (bytes: Uint8Array): string => new TextDecoder().decode(bytes);

    private static xor = (bytes: Uint8Array): Uint8Array => bytes.map((byte) => byte ^ 129);

    private static toBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64");

    private static toHex = (bytes: Uint8Array) => Buffer.from(bytes).toString("hex");

    private static fromBase64 = (base64: string): Uint8Array => Buffer.from(base64, "base64");
}