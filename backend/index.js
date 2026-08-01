const express = require('express');
const cors = require('cors');
const app = express();

const { PORT, APP_NAME } = require('./config/env');
const taskRoutes = require('./routes/taskRoutes');


app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send(`${APP_NAME} is running...`);
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running at http://localhost:${PORT}`);
});