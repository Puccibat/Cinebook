import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrderAsync } from '../api/apiOrder';
import API from '../api/config';
import axios from 'axios';

const CheckoutForm = ({ orderBilling }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const initialCredentials = {
    name: '',
    email: '',
  };
  const [credentials, setCredentials] = useState(initialCredentials);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    setProcessing(true);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`${API}/payment`, {
          amount: orderBilling.totalPrices * 100,
          id,
        });

        if (response.data.success) {
          setSuccess(true);
          const newOrder = {
            tickets: orderBilling.order.tickets.map(
              (ticket) => ticket.ticketId
            ),
            sessionId: orderBilling.order.session._id,
            totalPrice: orderBilling.totalPrices,
            transactionId: paymentMethod.id,
            clientEmail: credentials.email,
            clientName: credentials.name,
          };
          await createOrderAsync(newOrder);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-9 grid-rows-6 gap-2'>
            <label className='col-start-4 font-semibold text-white'>
              Nom de facturation:
            </label>
            <input
              type='text'
              required
              onChange={handleInputChange}
              value={credentials.name}
              name='name'
              placeholder='Votre nom'
              className='col-start-5 col-end-7 p-2 rounded text-gray-900'
            />
            <label className='col-start-4 m-auto font-semibold text-white'>
              Email:
            </label>
            <input
              type='email'
              required
              onChange={handleInputChange}
              value={credentials.email}
              name='email'
              placeholder='Votre adresse mail'
              className='col-start-5 col-end-7 p-2 rounded text-gray-900'
            />
            <div className='col-start-4 col-end-7 row-start-4 p-2 border-white border'>
              <CardElement options={cardElementOptions} />
            </div>

            <button
              type='submit'
              className='rounded-md py-4 px-6 col-start-5 row-start-6 font-semibold text-white bg-red-500 focus:outline-none'
              disabled={isProcessing || !stripe}
            >
              {isProcessing
                ? 'Payement en cours...'
                : `Payer ${orderBilling.totalPrices}€`}
            </button>
          </div>
        </form>
      ) : (
        <div className='grid grid-cols-3 '>
          <h1 className='col-start-2 font-semibold text-3xl text-white mx-auto h-16'>
            Merci pour le paiement !
          </h1>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
