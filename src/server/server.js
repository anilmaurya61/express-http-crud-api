const express = require('express');
const cors = require('cors');
const todoRoutes = require('../Routes/todos');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);
app.use(express.static('./src/Frontend'));


let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/Frontend/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
