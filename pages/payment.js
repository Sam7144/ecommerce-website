import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckOutWizzard'
import Layout from '../components/layout'
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const[selectedPaymentMethod,setSelectedPaymentMethod]=useState('');
  const {state,dispatch}=useContext(Store);
  const {cart}=state;
  const {shippingAddress,paymentMethod}=cart;
  const router=useRouter()
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(()=>{
    if(!shippingAddress.address){
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod||'')
  },[paymentMethod,router,shippingAddress.address])
  return (
    <Layout title="payment">
        <CheckoutWizard activeStep={2}></CheckoutWizard>
        <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
            <h1 className="mb-4 text-xl">payment method</h1>
            {
                ['PayPal','Stripe','CashOnDelivery'].map((payment)=>(
                  <div key={payment} className="mb-4">
                    <input name='paymentMethod' className='p-2 outline-none ring-0'
                    id={payment} type="radio"
                    checked={selectedPaymentMethod===payment}
                    onChange={()=>setSelectedPaymentMethod(payment)}
                    />
                    <label className='p-2' htmlFor={payment}>
                      {payment}
                    </label>
                  </div>
                  
                ))
            }
            <div className='mb-4 flex justify-between'>
              <button
              onClick={()=>router.push('/shipping')}
              type="button" className='default-button'
              >back</button>
              <button
              type="submit" className='primary-button'
              >next</button>
            </div>
        </form>
    </Layout>
  )
}
PaymentScreen.auth=true;