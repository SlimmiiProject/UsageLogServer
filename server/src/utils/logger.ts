export class Logger {

    public static info(information: string) {
        this.log(information, LogType.INFO, console.info);
    }

    public static warn(warning: string) {
        this.log(warning, LogType.WARNING, console.warn);
    }

    public static error(error: string) {
        this.log(error, LogType.ERROR, console.error);
    }

    private static log(message: string, type: LogType, callback: { (message: string): void }) {
        const color: string = Object.values(Color)[type];
        const typeName: string = LogType[type];
        callback(`${color}[${typeName}] ${message}${Color.Reset}`);
    }
}

enum LogType {
    INFO = 1,
    WARNING = 2,
    ERROR = 3
}

enum Color {
    Reset = "\x1b[0m",
    FgBlue = "\x1b[34m",
    FgYellow = "\x1b[33m",
    FgRed = "\x1b[31m",
}