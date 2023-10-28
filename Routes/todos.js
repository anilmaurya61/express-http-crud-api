const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todos');
    res.json({ "todos": result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM todos WHERE id = ${id}`);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, isCompleted } = req.body;
    const result = await db.query('INSERT INTO todos (text, isCompleted) VALUES ($1, $2) RETURNING id', [text, isCompleted]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.status(201).json({ id: result.rows[0].id, text, isCompleted });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isCompleted } = req.body;
    const result = await db.query('UPDATE todos SET text = $1, isCompleted = $2 WHERE id = $3', [text, isCompleted, id]);
    if (result.command == 'UPDATE') {
      res.status(200).send('Todo updated successfully');
    } else {
      res.status(404).send('Todo not found'); 
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`DELETE FROM todos WHERE id = ${id}`);
    if (result.affectedRows === 1) {
      res.status(204).send('Todo deleted successfully'); 
    } else {
      res.status(404).send('Todo not found'); 
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
