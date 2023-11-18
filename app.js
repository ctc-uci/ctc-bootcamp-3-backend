const express = require('express');
const cors = require('cors');

require('dotenv').config();

// routes
const memberRouter = require('./routes/memberRouter');
const gameRouter = require('./routes/gameRouter');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use('/members', memberRouter);
app.use('/games', gameRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
