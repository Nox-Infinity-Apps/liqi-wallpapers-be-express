import cliProgress from 'cli-progress';
import colors from "ansi-colors";
import cons from "./index";

export class ProgressBar {
    private bar: cliProgress.SingleBar;

    constructor() {
        this.bar = new cliProgress.SingleBar({
            format: ` {bar} {percentage}% `,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        });
    }

    public start(total: number, filename: string): void {
        this.bar.start(total, 0, {filename: filename});
    }

    public update(value: number): void {
        cons.clear();
        this.bar.update(value);
    }

    public stop(): void {
        this.bar.stop();
    }

    public static red(str: string): void {
        console.log(colors.red(str));
    }
}

export default ProgressBar;
