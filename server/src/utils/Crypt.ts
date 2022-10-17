import bcrypt from "bcrypt";
import { TextEncoder } from "util";

/**
 * Encryption with 4 steps, BCrypt, Bytes, XOR, Base64
 */
export class Crypt {

    private static get saltRounds() {
        return 15;
    }

    public static matchesEncrypted(rawContent: string, encryptedContent: string): boolean {
        return bcrypt.compareSync(rawContent, this.decryptToHash(encryptedContent));
    }

    public static createRandomPassword(length: number) {
        return [...new Array(length).keys()].reduce((password) => password + String.fromCharCode(Math.floor(Math.random() * 128)), "");
    }

    public static encrypt(content: string): string {
        const hashedInput = bcrypt.hashSync(content, this.saltRounds);
        const bytesInput = this.toBytes(hashedInput);
        const xorInput = this.xor(bytesInput);
        return this.toBase64(xorInput);
    }

    private static decryptToHash(encryped: string): string {
        const decryptedB64 = this.fromBase64(encryped);
        const decryptedXOR = this.xor(decryptedB64);
        const decryptedBytes = this.fromBytes(decryptedXOR);
        return decryptedBytes;
    }

    private static toBytes(content: string): Uint8Array {
        return new TextEncoder().encode(content);
    }

    private static fromBytes(bytes: Uint8Array): string {
        return new TextDecoder().decode(bytes);
    }

    private static xor(bytes: Uint8Array): Uint8Array {
        return bytes.map((byte) => byte ^ 129);
    }

    private static toBase64(bytes: Uint8Array) {
        return Buffer.from(bytes).toString("base64");
    }

    private static fromBase64(base64: string): Uint8Array {
        return Buffer.from(base64, "base64");
    }
}