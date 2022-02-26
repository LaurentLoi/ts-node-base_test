import { CommandBuilder } from 'yargs';
import { IItem } from '../../shared/models/item.interface';
import { findAll } from '../../shared/services/items.service';

export const command = 'print-items';
export const desc = 'Print our items.';

export const builder: CommandBuilder<void> = (yargs) =>
    yargs.positional('items', {
        type: 'string',
        demandOption: true,
    });

export const handler = async (): Promise<void> => {
    let printer = "Let's print our items !\n";

    const items: IItem[] = await findAll();
    for (const item of items) {
        printer += `\n    ${item.id} - ${item.name} - ${item.price / 100}€ - ${
            item.description
        }.`;
    }

    process.stdout.write(printer);
    process.exit(0);
};
