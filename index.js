const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movie');
const theaterRoute = require('./routes/theater');
const ticketTypeRoute = require('./routes/ticketType');
const sessionRoute = require('./routes/session');

dotenv.config();

//DB connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('Connected to Database')
);

//Middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Route middlewares
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', movieRoute);
app.use('/api', theaterRoute);
app.use('/api', ticketTypeRoute);
app.use('/api', sessionRoute);

app.listen(3000, () => console.log('Server is running at port 3000'));
