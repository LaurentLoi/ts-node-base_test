import { IItem } from '../../shared/models/item.interface';
import { findAll } from '../../shared/services/items.service';
import { exit } from '../loop/exit';

const prompt = require('prompt-sync')({ sigint: true });

export const command = 'menu';
export const desc = "Here's what we can do for you.";

export const handler = async (): Promise<void> => {
    const play = true;
    const items: IItem[] = await findAll();

    while (play) {
        console.log('\n');
        console.log(
            '╔══════════════════════════════════════════════════════════════════════╗'
        );
        console.log(
            '║   > Hey there !                                                      ║'
        );
        console.log(
            "║   > Here's what we propose:                                          ║"
        );
        console.log(
            '║                 ------                                               ║'
        );
        console.log(
            '║   Menu:                                                              ║'
        );
        console.log(
            '║                                                                      ║'
        );
        for (const item of items) {
            console.log(`║   >${item.id}: ${item.name} - ${item.price / 100}`);
        }
        console.log(
            '║                 ------                                               ║'
        );
        console.log(
            "║   > To get details about one item, type its id and press 'enter'.    ║"
        );
        console.log(
            "║   > To exit, type 'q' or 'exit'.                                     ║"
        );
        console.log(
            '╚══════════════════════════════════════════════════════════════════════╝'
        );

        const answer = prompt('> ') || '';

        const itemToFind = items.find((item: IItem) => item.id === +answer);
        if (itemToFind) {
            console.log('found an item id: ', itemToFind);
        } else {
            switch (answer.toLowerCase()) {
                case 'q':
                    exit();
                    break;
                default:
                    console.log('unknown command: ', answer);
                    break;
            }
        }
        console.log("Let's continue to play !");
    }
};
