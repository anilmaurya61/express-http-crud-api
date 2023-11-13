const express = require('express');
const router = express.Router();
const Todo = require('../Models/Todo');
const errorHandler = require('../middleware/errorHandler')
const todoSchema = require('../Validation/todosValidation');
const validation = require('../middleware/validationMiddleware')


router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json({ todos });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      const notFoundError = new Error('Todo not found');
      notFoundError.status = 404;
      throw notFoundError;
    } else {
      res.json(todo);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/',validation(todoSchema), async (req, res, next) => {
  try {
    const { text, isCompleted } = req.body;
    const todo = await Todo.create({ text, isCompleted });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',validation(todoSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, isCompleted } = req.body;
    const updatedTodo = await Todo.update(
      { text, isCompleted },
      {
        where: { id },
      },
    );
    if (updatedTodo[0] === 1) {
      res.status(200).send('Todo updated successfully');
    } else {
      const notFoundError = new Error('Todo not found');
      notFoundError.status = 404;
      throw notFoundError;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.destroy({
      where: { id },
    });
    if (deletedTodo === 1) {
      res.status(200).send('Todo deleted successfully');
    } else {
      const notFoundError = new Error('Todo not found');
      notFoundError.status = 404;
      throw notFoundError;
    }
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
