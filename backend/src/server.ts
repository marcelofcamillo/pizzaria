import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
