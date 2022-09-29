export class Logger {

    public static info(information: string) {
        this.log(information, LogType.INFO);
    }

    public static warn(warning: string) {
        this.log(warning, LogType.WARNING);
    }

    public static error(error: string) {
        this.log(error, LogType.ERROR);
    }

    private static log(message: string, type: LogType) {
        const color: Color = Object.values(Color).at(type)!;
        const typeName: string = Object.values(LogType)[type].toString();
        console.log(`${color}[${typeName}] ${message}${Color.Reset}`)
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