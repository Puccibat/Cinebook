import React, { useState, useEffect } from 'react';
import { getTicketTypes } from '../api/apiTicketType';

const ValidationTable = ({
  sessionSelected,
  orderStepAction,
  setOrderBilling,
}) => {
  const initTicketsOrder = () => {
    let ticketsOrder = [];
    for (let i = 0; i < sessionSelected.places; i++) {
      ticketsOrder.push({ key: i, ticketId: null });
    }
    return ticketsOrder;
  };

  const OrderStepEnum = {
    session: 'session',
    price: 'price',
    order: 'order',
  };

  const [ticketTypes, setTicketTypes] = useState([]);
  const [order, setOrder] = useState({
    tickets: initTicketsOrder(),
    session: sessionSelected.session,
  });

  const loadTicketTypes = async () => {
    const ticketTypesList = await getTicketTypes();
    if (ticketTypesList) {
      setTicketTypes(ticketTypesList);
    }
  };

  const getPriceByPlaceIndex = (key) => {
    let price = 0;
    const { ticketId } = order.tickets[key];
    if (ticketId) {
      return ticketTypes.find((ticketType) => ticketType._id === ticketId)
        ?.price;
    }
    return price;
  };

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    order.tickets[key].ticketId = value;
    setOrder({ ...order, tickets: order.tickets });
  };

  useEffect(() => {
    loadTicketTypes();
  }, []);

  const validationOrder = async () => {
    if (verifOrderValide()) {
      setOrderBilling({
        order,
      });
      orderStepAction(OrderStepEnum.order);
    }
  };

  const verifOrderValide = () => {
    let valideOrder = true;
    order.tickets.forEach((ticket, i) => {
      const currentTicketPrice = getPriceByPlaceIndex(i);
      if (!currentTicketPrice) {
        valideOrder = false;
      }
    });
    return valideOrder;
  };

  const renderPlaces = () => {
    let rows = [];

    for (let i = 0; i < sessionSelected.places; i++) {
      rows.push(
        <tr key={i}>
          <td className='border border-red-500 p-2'>
            <select
              onChange={(e) => handleInputChange(e, i)}
              value={ticketTypes.name}
              key={i}
              name='ticketType'
              className='w-64 p-2 rounded text-gray-900 h-10 my-auto'
            >
              <option>Sélectionnez un tarif</option>
              {ticketTypes.map((ticketType, index) => (
                <option key={index} value={ticketType._id}>
                  {ticketType.name}
                </option>
              ))}
            </select>
          </td>
          <td className=' border border-red-500'>{getPriceByPlaceIndex(i)}</td>
        </tr>
      );
    }
    return rows;
  };

  const getTotalPrices = () => {
    let totalPrices = 0;

    order.tickets.forEach((ticket, i) => {
      totalPrices += getPriceByPlaceIndex(i) ?? 0;
    });

    return (
      <tr>
        <td></td>
        <td></td>
        <td className=' border border-red-500'>{totalPrices}</td>
      </tr>
    );
  };

  return (
    <div>
      <div className='text-center text-white font-semibold text-xl'>
        Vous avez choisis {sessionSelected.places}{' '}
        {sessionSelected.places > 1 ? 'places' : 'place'}
        <table className='table-auto border-collapse border border-red-500 mx-auto my-5 '>
          <thead>
            <tr>
              <th className=' border border-red-500 p-2'>Tarif</th>
              <th className=' border border-red-500 p-2'>Prix</th>
              <th className=' border border-red-500 p-2'>Prix Total</th>
            </tr>
          </thead>
          <tbody>{renderPlaces()}</tbody>
          <tfoot>{getTotalPrices()}</tfoot>
        </table>
      </div>
      <div className=' text-white text-center py-5'>
        <button
          className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'
          onClick={validationOrder}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default ValidationTable;
