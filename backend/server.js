import express from 'express';
import signale from 'signale';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('common'));

app.post('/username', (req, res) => {
  res.json({status: 'success'});
});

app.listen(4000, () => {
  signale.start('Server running on http://localhost:4000')
});