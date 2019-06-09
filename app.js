require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const routes = require('./routes/routes');
const headers = require('./middleware/headers');
const session = require('./middleware/session.manager');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Rate Limiter
const rateLimiterMiddleware = require('./middleware/rate.limiter');
app.use(rateLimiterMiddleware);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.SERVICE_DB_HOST, {
    useMongoClient: true,
    config: {
        autoIndex: false
    },
    promiseLibrary: global.Promise
}).catch((err)=>{
    console.log('Unable to connect to ' + process.env.SERVICE_DB_HOST);
    //console.log(err);
});


//set directory of log files
const logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

//Wear helmet
app.use(helmet());

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}));

//cross origin resourse sharing
app.use(cors());

//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    limit: '500mb'
}));


// middleware to use for all requests headers
app.use(headers);

//middleware to use for all request session
app.use(session);

//use api routes
app.use(routes);

//start server and listen on specified port
app.listen(process.env.SERVICE_PORT, () => {
    console.log('Identity Service is running on port ' + process.env.SERVICE_PORT);
});

mongoose.connection.on('open', () => {
    console.log('Database is connected');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});