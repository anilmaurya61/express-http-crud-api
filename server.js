const express = require('express');
const cors = require("cors");

const app = express();
const path = require('path');

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('Frontend'));

const todoRoutes = require('./Routes/todos');

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./Frontend/index.html'));
});

app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
