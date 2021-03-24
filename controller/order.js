const Order = require('../model/Order');
const { getSessionById } = require('./session');

//Create a order
const createOrder = async (req, res) => {
  try {
    const {
      sessionId,
      tickets,
      clientName,
      transactionId,
      clientEmail,
      totalPrice,
    } = req.body;
    const newOrder = new Order({
      tickets,
      sessionId,
      clientName,
      clientEmail,
      transactionId,
      totalPrice,
    });

    const orderCreated = await newOrder.save();
    const currentSession = await getSessionById(sessionId);
    await sendEmailOrder(clientName, clientEmail, currentSession);
    res.status(201).json(orderCreated);
  } catch (e) {
    console.error(e);
    res.status(500).json('There is an error, please try again');
  }
};
const sendEmailOrder = async (userName, userEmail, session) => {
  try {
    const mailjet = require('node-mailjet').connect(
      '9a5b1d2b8e4ea022da16ac098086cd7d',
      '6eaf7bec61978d77fb1b2751c943e768'
    );
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'baptiste.puccinelli@gmail.com',
            Name: 'Baptiste',
          },
          To: [
            {
              Email: userEmail,
              Name: userName,
            },
          ],
          Subject: 'Votre réservation',
          TextPart: 'Votre réservation pour la séance du ...',
          HTMLPart: `<h3>Votre séance du ${session.date} à ${session.startTime} pour ${session.movie.title} est confirmée </h3>
            <br />
            May the delivery force be with you!`,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
    console.log(request);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  createOrder,
};
