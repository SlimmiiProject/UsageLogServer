import { DateUtil, Period } from "../utils/DateUtil";

const periodEntries: Map<Period, [Date, Date]> = new Map([
    ["Day", [new Date(2022, 10, 7), new Date(2022, 10, 8)]],
    ["Week", [new Date(2022, 10, 7), new Date(2022, 10, 13)]],
    ["Month", [new Date(2022, 10, 1), new Date(2022, 10, 30)]]
]);

test("GetDateOverPeriod Returns correct Date", () => {
    periodEntries.forEach((dates, period) => {
        const beginDate = dates[0];
        const endDate = dates[1];
        expect(DateUtil.getDateOverPeriod(beginDate, period)).toStrictEqual(endDate);
    });
});