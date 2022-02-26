const prompt = require('prompt-sync')({ sigint: true });

export const exit = (): boolean => {
    let exit = false;

    while (!exit) {
        const answer: string =
            prompt('Are you sure you want to exit ? (Y/N): ') || '';

        if (promptCheckN(answer)) {
            return exit;
        } else if (promptCheckY(answer)) {
            exit = true;
        } else {
            let reminder = '';
            while (!promptCheckY(reminder)) {
                reminder = prompt('--> Y/N: ') || '';
                if (promptCheckN(reminder)) {
                    return exit;
                }
            }
            exit = true;
        }
    }
    console.log('Good bye !');
    process.exit(0);
};

const promptCheckY = (answer: string): boolean => {
    return answer.toLowerCase() === 'y';
};

const promptCheckN = (answer: string): boolean => {
    return answer.toLowerCase() === 'n';
};
