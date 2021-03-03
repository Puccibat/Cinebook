const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movie');
const theaterRoute = require('./routes/theater');
const ticketTypeRoute = require('./routes/ticketType');
const sessionRoute = require('./routes/session');
const uploadRoute = require('./routes/upload');
const orderRoute = require('./routes/order');

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
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Route middlewares
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', movieRoute);
app.use('/api', theaterRoute);
app.use('/api', ticketTypeRoute);
app.use('/api', sessionRoute);
app.use('/api', uploadRoute);
app.use('/api', orderRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running at port ${port}`));
