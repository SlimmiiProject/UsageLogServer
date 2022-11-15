import { ObjectUtil } from "../utils/ObjectUtil";

test("firstNonUndefined returns first defined value", () => {
    expect(ObjectUtil.firstNonUndefined([undefined, null, "Test", null, true])).toEqual("Test");
});