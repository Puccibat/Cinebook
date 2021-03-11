import React, { useState, useEffect } from 'react';
import { getTicketTypes } from '../api/apiTicketType';

const Infos = () => {
  const [ticketTypes, setTicketTypes] = useState([]);

  const loadTicketTypes = () => {
    getTicketTypes().then((data) => {
      setTicketTypes(data);
    });
  };

  useEffect(() => {
    loadTicketTypes();
  }, []);

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
      {ticketTypes &&
        ticketTypes.map((ticketType, index) => (
          <div key={index}>
            <h3 className='pt-4 text-xl'>
              -{ticketType.name}: {ticketType.price} €
            </h3>
            <p>{ticketType.description}</p>{' '}
          </div>
        ))}
    </div>
  );
};

export default Infos;
