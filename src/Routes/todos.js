const express = require('express');
const router = express.Router();
const Todo = require('../Models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json({ todos });
  } catch (error) {
    console.error('Error retrieving todos', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(todo);
    }
  } catch (error) {
    console.error('Error retrieving todo', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, isCompleted } = req.body;
    const todo = await Todo.create({ text, isCompleted });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo', error);
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
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
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    console.error('Error updating todo', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.destroy({
      where: { id },
    });
    if (deletedTodo === 1) {
      res.status(200).send('Todo deleted successfully');
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    console.error('Error deleting todo', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
