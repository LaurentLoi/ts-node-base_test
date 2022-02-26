/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import { IBaseItem, IItem } from '../models/item.interface';
import * as ItemService from '../services/items.service';

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */
// GET items.ts
itemsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const items: IItem[] = await ItemService.findAll();
        res.status(200).send(items);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// GET items.ts/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    try {
        const item: IItem = await ItemService.find(id);
        if (item) {
            return res.status(200).send(item);
        }

        res.status(404).send('item not found');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// POST items.ts
itemsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const item: IBaseItem = req.body;
        const newItem = await ItemService.create(item);
        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// PUT items.ts/:id
itemsRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    try {
        const itemUpdate: IItem = req.body;
        const existingItem: IItem = await ItemService.find(id);
        if (existingItem) {
            const updatedItem: IItem | null = await ItemService.update(
                id,
                itemUpdate
            );
            return updatedItem
                ? res.status(200).json(updatedItem)
                : res.status(404).send('item not found');
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

// DELETE items.ts/:id
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;
        await ItemService.remove(id);
        res.sendStatus(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
