const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

const rolesRouter = require('./routes/role');
const userRouter = require('./routes/user');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch((error) => console.error(error));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) =>
  res.status(200).json('Welcome to MultiGames server')
);

app.use('/api/roles', rolesRouter);
app.use('/api/users', userRouter);
app.post('/api/calculate', (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const result = a + b;

  res.status(200).json(result);
});

app.listen(port || process.env.PORT, () =>
  console.log(`Multigames listening on port ${port}!`)
);
