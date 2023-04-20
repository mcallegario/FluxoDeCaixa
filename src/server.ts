import dotenv from 'dotenv';
dotenv.config(); //carregar as variáveis de ambiente

const PORT = parseInt(`${process.env.PORT || 3000}`);

import app from './app';

app.listen(PORT, () => console.log(`O servidor está sendo executado na porta ${PORT}.`));