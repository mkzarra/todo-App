const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const todoRouter = require('./routes/todo-router');

const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index', {
        appName: 'todos',
    });
});

app.use('/todos', todoRouter);

app.use('*', (req, res) => {
    res.status(404).send({
        error: `Not Found`,
    });
});

app.use((err, req, res, next) => {
    res.status(500).send({ err, message: err.message });
})