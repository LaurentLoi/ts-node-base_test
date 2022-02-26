import { exit } from '../loop/exit';

const prompt = require('prompt-sync')({ sigint: true });

export const command = 'loop';
export const desc = 'Loop test.';

export const handler = async (): Promise<void> => {
    const play = true;

    console.log('\n');
    console.log('Time to play !');
    console.log('\n');

    while (play) {
        const answer =
            prompt('Do you want to launch exit procedure ? Y/N: ') || '';

        if (answer.toLowerCase() === 'y') {
            exit();
        }
        console.log("Let's continue to play !");
        console.log('\n');
    }
};
