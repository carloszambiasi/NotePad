require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const courseRoutes = require('./routes/courses');
const noteRoutes = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/courses', courseRoutes);
app.use('/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
