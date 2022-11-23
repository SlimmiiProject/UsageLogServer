export type Period = "Day" | "Week" | "Month";



export class DateUtil {

    public static getStartOfPeriod = (currentDate: Date, period: Period) => {
        switch (period) {
            case "Day": return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            case "Week": return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (((currentDate.getDay() - 1) + 7) % 7));
            case "Month": return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        }
    }

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
    public static getDateOverPeriod = (beginDate: Date, period: Period): Date => {
        const tempDate = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate());

        switch (period) {
            case "Day": return new Date(tempDate.setDate(beginDate.getDate() + 1));
            case "Week": return new Date(tempDate.setDate(beginDate.getDate() + 6));
            case "Month": return new Date(tempDate.getFullYear(), beginDate.getMonth() + 1, 0);
        }
    }

    public static getDayOfMonth = (year: number, month: number, day: number) => new Date(year, month, day)

    public static get dayInMillis(): number { return 86_400_000; }

    public static getDisplayForPeriod = (date: Date, period: Period) => {
        switch (period) {
            case "Day": return `${date.getHours().toString()} time.hour`;
            case "Week": return this.getTranslationForDay(date.getDay());
            case "Month": return  `${date.getDate()}/${date.getMonth()}`;
        }
    }

    public static getTranslationForDay = (day: number) => {
        switch (day) {
            case 0: return "days.sunday";
            case 1: return "days.monday";
            case 2: return "days.tuesday";
            case 3: return "days.wednesday";
            case 4: return "days.thursday";
            case 5: return "days.friday";
            case 6: return "days.saturday";
        }
    }

    public static getCurrentDate = () => new Date(Date.now());
}
