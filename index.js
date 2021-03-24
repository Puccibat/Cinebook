const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
dotenv.config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET);

//Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const movieRoute = require('./routes/movie');
const theaterRoute = require('./routes/theater');
const ticketTypeRoute = require('./routes/ticketType');
const sessionRoute = require('./routes/session');
const uploadRoute = require('./routes/upload');
const orderRoute = require('./routes/order');
const { EMSGSIZE } = require('constants');

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

//Payment
app.post('/api/payment', cors(), async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: 'Payement Cinebook',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (err) {
    console.log('Error', err);
    res.json({ message: 'Payment failed', success: false });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running at port ${port}`));
