exports.sendEmailOrder = async (user, session) => {
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
            Email: user.email,
            Name: 'Baptiste',
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
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};
