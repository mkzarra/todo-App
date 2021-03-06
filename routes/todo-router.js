const express = require('express');
const todoRouter = express.Router();

const todoController = require('../controllers/todo-controller');
const authHelpers = require('../services/auth/auth-helpers');

todoRouter.get('/', authHelpers.loginRequired, todoController.index);
todoRouter.get('/add', authHelpers.loginRequired, (req, res) => {
    res.render('todos/add');
});
todoRouter.post('/', todoController.create);
todoRouter.get('/:id([0-9]+)', todoController.show, (req, res) => {
    res.render('todos/show', {
        todo: res.locals.todo,
    });
});
todoRouter.get('/:id([0-9]+)/edit', authHelpers.loginRequired, todoController.show, (req, res) => {
    res.render('todos/edit', {
        todo: res.locals.todo,
    });
});
todoRouter.put('/:id([0-9]+)', todoController.update);
todoRouter.delete('/:id([0-9]+)', authHelpers.loginRequired, todoController.delete);

module.exports = todoRouter;