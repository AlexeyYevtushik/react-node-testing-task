const express = require('express');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const loginRouter = require('./routes/login');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);

app.use('/items', authMiddleware, itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
