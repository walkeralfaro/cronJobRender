import express from 'express'
import cron from 'cron'
import http from 'http'
import cors from 'cors'

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get(process.env.PATH_AWAKE, (res) => {
  res.send('still awake')
})

function performGetRequest() {
  const options = {
    host: process.env.HOST,
    port: port,
    path: process.env.PATH_AWAKE
  };

  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });
  
    response.on('end', () => {
      console.log(data);
    });
  }).on('error', (error) => {
    console.error('Error al realizar la petición HTTP:', error.message);
  });
}

const cronJob = new cron.CronJob('*/1 * * * *', performGetRequest);
cronJob.start();

app.listen( port, () => {
  console.log(`Sevidor ejecutandose en el puerto ${port}`);
})