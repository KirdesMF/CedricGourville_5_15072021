import { formatPrice } from '../utils/utils';

export const Success = {
   render: () => {
      const category = history.state.category;

      //TODO make an utility function session storage
      const orderId = sessionStorage.getItem('orderId');
      const total = sessionStorage.getItem(`${category}-total`);

      return /*html */ `
         <section class="success h100 panel grid grid-items-center">
            <div class="wrapper" >
               <div class="success__inner grid-flow" >
                  <h1>Everything is good <span>🎉</span></h1>
                  <div class="success__content grid-flow">
                     <h2> Thank you for your order</h2>
                     <p>Order: <b>${orderId}</b></p>
                     <p>Total Price: <b>${formatPrice(total)}</b></p>
                     <a href="/" data-router>
                        Continue shopping
                        <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                           <circle pathLength="100" r="22" cx="24" cy="24" fill="none"/>
                           <polyline pathLength="100" points="9.6 24 24 34.6 36.9 14.8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
         </section>
      `;
   },
};
