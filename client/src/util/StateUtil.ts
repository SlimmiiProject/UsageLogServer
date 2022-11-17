import { Dispatch, SetStateAction } from "react";

export class StateUtil {

    public static setValue<T>(key: keyof T, value: any, setter: Dispatch<SetStateAction<T>>) {
        setter((previous) => {
            const copy: T = { ...previous };
            copy[key] = value;
            return copy;
        })
    }
}