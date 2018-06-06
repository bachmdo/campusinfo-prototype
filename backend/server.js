import express from 'express';
import signale from 'signale';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import moment from 'moment';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('common'));

app.post('/username', async (req, res) => {
  const startDate = '2018-02-19';
  const url = `https://api.apps.engineering.zhaw.ch/v1/schedules/students/bachmdo2?startingAt=${startDate}`;
  const method = 'GET';
  const headers = {
    'User-Agent': 'Timetable-Test (https://github.engineering.zhaw.ch/bachmdo2)'
  };
  const config = { method, headers };
  const response = await fetch(url, config).catch((err) => console.log(err));
  const json = await response.json();
  res.json(json);
});

app.listen(4000, () => {
  signale.start('Server running on http://localhost:4000');
});
