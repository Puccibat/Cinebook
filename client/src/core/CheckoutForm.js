import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrderAsync } from '../api/order';

const CheckoutForm = ({ orderBilling }) => {
  const stripe = useStripe();
  const elements = useElements();

  const validationOrder = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      console.error('error', error);
    } else {
      console.log('payment', paymentMethod);
      const newOrder = {
        tickets: orderBilling.tickets.map((ticket) => ticket.ticketId),
        session: orderBilling.session._id,
        transactionId: paymentMethod.id,
      };
      const orderCreated = await createOrderAsync(newOrder);
      if (orderCreated) {
        //success
      } else {
        //error
      }
    }
  };

  return (
    <form>
      <CardElement />
      <button
        className='rounded-md py-2 px-4 bg-red-500 focus:outline-none'
        onClick={validationOrder}
      >
        Payer!!
      </button>
    </form>
  );
};

export default CheckoutForm;
