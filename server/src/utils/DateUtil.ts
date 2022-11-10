export type Period = "Day" | "Week" | "Month";

export class DateUtil {

    /**
     * "Given a date and a period, return the date that is the end of that period."
     *
     * For example, if the start date is "1/1/2022" and the period is "Month", the function should
     * return "31/1/2022".
     *
     * Any
     * @param {Date} beginDate - Date - The date to start from
     * @param {Period} period - Period = "Day" | "Week" | "Month"
     * @returns A date object.
     */
    public static getDateOverPeriod(beginDate: Date, period: Period): Date {
        switch (period) {
            case "Day": return new Date(beginDate.setDate(beginDate.getDate() + 1));
            case "Week": return new Date(beginDate.setDate(beginDate.getDate() + (7 - beginDate.getDay())));
            case "Month": return new Date(beginDate.getFullYear(), beginDate.getMonth() + 1, 0);
        }
    }

    public static getDayOfMonth(year: number, month: number, day: number) {
        return new Date(year, month, day);
    }

    public static get dayInMillis(): number {
        return 86_400_000;
    }

    public static getDisplayForPeriod(date: Date, period: Period) {
        switch (period) {
            case "Day": return date.getHours().toString();
            case "Week": return this.getDayName(date, "nl-NL");
            case "Month": return this.getDateFull(date, "nl-NL");
        }
    }

    public static getDayName(date:Date, locale:string) {
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    public static getDateFull(date:Date, locale:string) {
        return date.toLocaleDateString(locale, { weekday:"long", day: '2-digit', month: "2-digit", year:"2-digit" });
    }
}
