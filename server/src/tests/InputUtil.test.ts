import { ObjectUtil } from "../utils/ObjectUtil";

const testValues = ["A", undefined, null, "B", undefined, ""];
const testValuesCorrect = ["A", "B", "C"];

test("isSet returns correctly when passed a string", () => {
    expect(testValues.every(ObjectUtil.isSet)).toBeFalsy();
    expect(testValuesCorrect.every(ObjectUtil.isSet)).toBeTruthy();
})