const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/create', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:taskname/:email/:date', async (req, res) => {
  try {
    const { taskname, email, date } = req.params;
    const updatedTask = await Task.findOneAndUpdate({ taskname, email, date, iscompleted: false }, { iscompleted: true }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or already completed' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve tasks on a given date
router.get('/date/:date/:email', async (req, res) => {
  try {
    const { date, email } = req.params;
    const tasks = await Task.find({ date, email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve tasks between two dates
router.get('/date/:start/:end/:email', async (req, res) => {
  try {
    const { start, end, email } = req.params;
    const tasks = await Task.find({ date: { $gte: start, $lte: end }, email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
