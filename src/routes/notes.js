const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/new', (req,res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', async (req,res) => {
  const { title, description, quantity } = req.body;
  const errors = [];
  if(!title) {
    errors.push({text: 'Please write a Title'});
  }
  if(!description) {
    errors.push({text: 'Please write a Description'});
  }
  if(!quantity) {
    errors.push({text: 'Please write a Quantity'});
  }
  if(errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description,
      quantity
    });
  } else {
    const newNote = new Note({ title, description, quantity });
    await newNote.save();
    req.flash('success_msg', 'La nota se ha creado correctamente');
    res.redirect('/notes');
  }
});

router.get('/notes', async (req,res) => {
  const notes = await Note.find().sort({date: 'desc'});
  res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.render('notes/edit-note', {note});
});


router.put('/notes/edit-note/:id', async (req,res) => {
   const {title, description, quantity} = req.body;
   await Note.findByIdAndUpdate(req.params.id, { title, description, quantity});
   req.flash('success_msg', 'La nota ha sido actualizada con éxito!');
   res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','La nota ha sido eliminada');
  res.redirect('/notes');
  
});


module.exports = router ;
