import ProgressBar from './progressbar';

class cons {
    static red(str: string): void {
        console.log(`\x1b[31m${str}\x1b[0m`);
    }

    static green(str: string): void {
        console.log(`\x1b[32m${str}\x1b[0m`);
    }

    static yellow(str: string): void {
        console.log(`\x1b[33m${str}\x1b[0m`);
    }

    static clear(){
        process.stdout.write('\x1Bc');
    }
}

export default cons;
export {ProgressBar};
