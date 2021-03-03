const Order = require('../model/Order');

const sendOrder = async () => {
  const mailjet = require('node-mailjet').connect(
    '9a5b1d2b8e4ea022da16ac098086cd7d',
    '6eaf7bec61978d77fb1b2751c943e768'
  );
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'baptiste.puccinelli@gmail.com',
          Name: 'Baptiste',
        },
        To: [
          {
            Email: 'b.dolzani@orange.fr',
            Name: 'Bérengère',
          },
        ],
        Subject: 'Votre réservation',
        TextPart: 'Votre réservation pour la séance du ...',
        HTMLPart:
          '<h3>Ça marche !</h3><br />May the delivery force be with you!',
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

//Create a order
const createOrder = async (req, res) => {
  try {
    const { session, tickets, clientName } = req.body;
    const newOrder = new Order({
      tickets,
      session,
      clientName,
    });

    const orderCreated = await newOrder.save();
    await sendOrder();
    res.status(201).json(orderCreated);
  } catch (e) {
    console.error(e);
    res.status(500).json('There is an error, please try again');
  }
};

module.exports = {
  createOrder,
};
