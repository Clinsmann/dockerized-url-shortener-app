import cors from 'cors';
import express, { Application } from 'express';

import TinyURLController from './controllers/TinyURLController';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use('', TinyURLController);

export default app;
