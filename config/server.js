require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../Authentication/Routes.js');
const profileRouter = require('../Post-Login/profileRoute');
const budgetRouter = require('../Post-Login/budgetRoute');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/home/user', profileRouter);
server.use('/home/budget', budgetRouter);

configureRoutes(server);

module.exports = server;