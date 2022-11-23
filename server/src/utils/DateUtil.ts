export type Period = "Day" | "Week" | "Month";



export class DateUtil {

    public static getStartOfPeriod = (currentDate: Date, period: Period) => {
        switch(period) {
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
            case "Day": return date.getHours().toString();
            case "Week": return this.getDayName(date, "nl-NL");
            case "Month": return this.getDateFull(date, "nl-NL");
        }
    }

    public static getDayName = (date: Date, locale: string) => date.toLocaleDateString(locale, { weekday: 'long' });

    public static getDateFull = (date: Date, locale: string) => date.toLocaleDateString(locale, { weekday: "long", day: '2-digit', month: "2-digit", year: "2-digit" });

    public static getCurrentDate = () => new Date(Date.now());
}
