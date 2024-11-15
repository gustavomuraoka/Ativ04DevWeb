const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log(`Servidor rodando na porta 3001`);
  });
}).catch(err => console.log(err));