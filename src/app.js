require('dotenv').config();
const { API_TOKEN } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');
const logger = require('./logger');

const app = express();

app.use(function validateBearerToken(req, res, next) {
    const authToken = req.get('Authorization');
    logger.error(`Unauthorized request to path: ${req.path}`);
  
    if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized request' });
    };
  
    next();
  });

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));

app.use(helmet());
app.use(cors());

app.use(bookmarksRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!')
});

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        repsonse = { message : error.message, error };
    };
    res.status(500).json(response);
});

module.exports = app