import React from 'react';

const Infos = () => {
  // const [ticketTypes, setTicketTypes] = useState([]);

  // const loadTicketTypes = () => {
  //   getTicketTypes().then((data) => {
  //     setTicketTypes(data);
  //   });
  // };

  return (
    <div className='container text-white my-5 mx-auto px-4 md:px-12'>
      <h1 className='text-3xl font-semibold'>Infos pratiques</h1>
      <p className='py-4'>
        Toutes nos salles sont climatisées et accessibles aux personnes à
        mobilité réduite
      </p>

      <h1 className='text-3xl font-semibold pt-2'>Venir au cinéma</h1>
      <p className='py-4'>
        Notre cinéma est accessible par plusieurs moyens de transports en
        commun. Nous disposons aussi d'un parking.
        <br />
        METRO: ligne 18
        <br />
        RER: RER G
        <br />
        BUS: ligne 698, 842 arrêt Champs des Sirènes
        <br />
        VOTRE NOM DE CINEMA
        <br />
        95 Avenue de la Sirène 75022 Paris Nous sommes ouvert 7j/7j de 9h30 à
        22h.
      </p>

      <h1 className='text-3xl font-semibold pt-2'>Tarifs</h1>
      <h3 className='pt-4 text-xl'>-Tarif étudiant: 7,50€</h3>
      <p>
        Pour les étudiants de moins de 26ans sur présentation de la carte
        étudiante
      </p>

      <h3 className='pt-4 text-xl'>-Tarif réduit: 6,90€</h3>
      <p>
        Pour les personnes de moins de 14ans sur présentation d'une pièce
        d'identité
      </p>

      <h3 className='pt-4 text-xl'>-Plein Tarif: 9,00€</h3>
    </div>
  );
};

export default Infos;
