import { InputUtil } from "../utils/InputUtil";

const testValues = ["A", undefined, null, "B", undefined, ""];
const testValuesCorrect = ["A", "B", "C"];

test("isSet returns correctly when passed a string", () => {
    expect(testValues.every(InputUtil.isSet)).toBeFalsy();
    expect(testValuesCorrect.every(InputUtil.isSet)).toBeTruthy();
})