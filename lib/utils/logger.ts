import chalk from 'chalk';
import { Spinner } from 'clui';

class Logger {

    private static loggerInstance: Logger;
    private spinner: any = new Spinner('', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

    public static getInstance(): Logger {
        if (!Logger.loggerInstance) {
            Logger.loggerInstance = new Logger();
        }
        return Logger.loggerInstance;
    }

    public startSpinner(message: string): void {
        this.spinner.start();
        this.spinner.message(chalk.yellow(message));
    }

    public updateSpinnerText(message: string) {
        this.spinner.message(chalk.yellow(message));
    }

    public stopSpinner() {
        this.spinner.stop();
    }

    public success(message: string): void {
        console.log(chalk.greenBright(message));
    }

    public error(message: string): void {
        console.log(chalk.red(message));
    }

    public info(message: string): void {
        console.log(chalk.blue(message));
    }

    public default(message: string): void {
        console.log(message);
    }

}

export default Logger.getInstance();
