const express = require('express');
const cors = require('cors');
const indexRoutes = require('./routes/index.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.use('/api/v1', indexRoutes);

module.exports = app;
