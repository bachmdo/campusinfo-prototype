import express from 'express';
import signale from 'signale';
import path from 'path';

import helloWorld from './helloworld';

helloWorld();

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.listen(4000, () => {
  signale.success('Server running on http://localhost:4000')
});