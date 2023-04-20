import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import lancamentoRouter from './routers/lancamentoRouter';

const app = express();

app.use(morgan('tiny')); //logs

app.use(cors()); //receber requisições de qualquer frontend

app.use(helmet()); //protege de vulnerabilidades comuns na web

app.use(express.json()); //permite que a API possa receber dados JSON

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

app.use('/lancamento/v1/', lancamentoRouter);

export default app;