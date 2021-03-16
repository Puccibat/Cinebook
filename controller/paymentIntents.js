const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);

const payment = async (req, res) => {
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
};

module.exports = payment;
