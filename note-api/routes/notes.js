const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET todas as anotações
router.get('/', async (req, res) => {
  const notes = await Note.find().populate('courseId');
  res.json(notes);
});

// POST nova anotação
router.post('/', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

// PUT atualizar anotação
router.put('/:id', async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE anotação
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
