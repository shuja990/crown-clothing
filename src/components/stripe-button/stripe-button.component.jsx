import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
const onToken = token => {
    console.log(token);
    alert('Payment Successful')
}
const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51GvpJkBqTtLhCjZjwbPrPtta9NtLdGLJsS3tRQRfTvGfP8xsneMD9n7lOZgSatK4RCFYRuGWnUL0rvxxuxGf9h5B00gNUmk6ZP'
    return(
        <StripeCheckout
            label='Pay Now'
            name='CROWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image= 'https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amout={priceForStripe}
            panelLabel="Pay Now"
            token= {onToken}
            stripeKey={publishableKey}
            allowRememberMe
        />
    );
}
export default StripeCheckoutButton