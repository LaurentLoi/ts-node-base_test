/**
 * SRC: https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
 * /
 * Required External Modules
 */
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { itemsRouter } from './shared/routing/items.router';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = +process.env.PORT;

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/menu/items.ts', itemsRouter);

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
