const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//DB connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log('Connected to Database')
);

//Import Routes
const authRoute = require('./routes/auth');

//Middleware
app.use(express.json());

//Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server is running at port 3000'));
