<script lang="ts">
    import PayPal from '$lib/components/ui/paypalstarter/PayPal.svelte';
    import { goto } from '$app/navigation';
  
    let amount = '';
  
    async function handleApprove(details: Record<string, unknown>) {
      console.log('Payment approved:', details);
      
      try {
        // Send payment details to your server
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            paymentDetails: {
              orderID: details.orderID,
              payerID: details.payerID,
              paymentID: details.paymentID,
              billingToken: details.billingToken,
              facilitatorAccessToken: details.facilitatorAccessToken,
              // Include any other relevant details from the PayPal response
              amount: amount,
              currency: 'USD', // or whatever currency you're using
            }
          }),
        });
  
        if (!response.ok) {
          throw new Error('Server response was not ok');
        }
  
        const result = await response.json();
  
        if (result.success) {
          goto('/thank-you');
        } else {
          throw new Error(result.message || 'Payment processing failed');
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        // Handle the error (e.g., show an error message to the user)
        alert('There was an error processing your payment. Please try again.');
      }
    }
  </script>
  
  <h1>Checkout</h1>
  <input type="number" bind:value={amount} placeholder="Enter amount" />
  <PayPal amount={amount} onApprove={handleApprove} />