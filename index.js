require('dotenv').config();

const server = require('./config/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Running on 5000');
});