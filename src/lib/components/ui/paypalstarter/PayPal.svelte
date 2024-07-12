<script lang="ts">
    import { onMount } from 'svelte';
    import { loadScript } from "@paypal/paypal-js";
    import type { PayPalNamespace, OnApproveData, OnApproveActions, CreateOrderActions } from "@paypal/paypal-js";
  
    export let amount = '0.00';
    export let currency = 'USD';
    export let onApprove: (details: Record<string, unknown>) => void = () => {};
  
    let paypal: PayPalNamespace | null = null;
  
    onMount(async () => {
      paypal = await loadScript({ 
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID 
      });
  
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: (_data: Record<string, unknown>, actions: CreateOrderActions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                amount: {
                  value: amount,
                  currency_code: currency
                }
              }]
            });
          },
          onApprove: (_data: OnApproveData, actions: OnApproveActions) => {
            if (actions.order) {
              return actions.order.capture().then(function(details: Record<string, unknown>) {
                onApprove(details);
              });
            }
            return Promise.reject('Order actions not available');
          },
          onError: (err: Record<string, unknown>) => {
            console.error('PayPal error:', err);
            // Handle the error (e.g., show an error message to the user)
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal SDK failed to load');
      }
    });
  </script>
  
  <div id="paypal-button-container"></div>