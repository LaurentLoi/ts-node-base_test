import { Arguments, CommandBuilder } from 'yargs';
import { IItem } from '../../shared/models/item.interface';
import { find } from '../../shared/services/items.service';

export const command = 'print-item <id>';
export const desc = 'Print item with <id>.';

export const builder: CommandBuilder<number> = (yargs) =>
    yargs.positional('id', {
        type: 'number',
        demandOption: true,
    });

export const handler = async (argv: Arguments<number>): Promise<void> => {
    const { id } = argv;
    const item: IItem = await find(id as number);
    let printer = "Let's print one item !\n";
    printer += `\n    ${item.id} - ${item.name} - ${item.price / 100}€ - ${
        item.description
    }.`;

    process.stdout.write(printer);
    process.exit(0);
};
