/**
 * Data Model Interfaces
 */
import { IBaseItem, IItem } from '../models/item.interface';
import { items } from '../mocks/items.mock';

/**
 * Service Methods
 */
export const findAll = async (): Promise<IItem[]> => Object.values(items);

export const find = async (id: number): Promise<IItem> => items[id];

export const create = async (newItem: IBaseItem): Promise<IItem> => {
    const items: IItem[] = await findAll()
    const id = items.length + 1;

    items[id] = {
        id,
        ...newItem
    };
    return items[id];
}

export const update = async (id: number, itemUpdate: IBaseItem): Promise<IItem | null> => {
    const item = await find(id);
    if (!item) {
        return null;
    }
    items[id] = { id, ...itemUpdate };
    return items[id];
}

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);
    if (!item) {
        return null;
    }
    delete items[id];
}
