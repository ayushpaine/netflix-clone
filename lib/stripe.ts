import {
    createCheckoutSession,
    getStripePayments,
  } from '@stripe/firestore-stripe-payments'
  import { getFunctions, httpsCallable } from '@firebase/functions'
  import app from '../lib/firebase/firebase'
import { error } from 'console'

  const payments = getStripePayments(app, {
    customersCollection:"customers",
    productsCollection:"products"
  })

  const loadCheckout = async (priceId: string) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    }).then((snapshot) => window.location.assign(snapshot.url)).catch((error) => console.log(error))
  }

  const redirectToBilling = async () => {
    const instance = getFunctions(app, 'us-central1')
    const functionRef = httpsCallable(instance,'ext-firestore-stripe-payments-createPortalLink');

    await functionRef({returnUrl : `${window.location.origin}/account`})
    .then(({data}: any) => window.location.assign(data.url))
    .catch((err) => console.log(err.message))
  }

  export { loadCheckout, redirectToBilling }
  export default payments