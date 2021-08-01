import { formatPrice } from '../utils/utils';

export const Success = {
   render: () => {
      const category = history.state.category;
      const orderId = sessionStorage.getItem('orderId');
      const total = sessionStorage.getItem(`${category}-total`);

      return /*html */ `
         <section class="success grid grid-items-center h100">
            <div class="wrapper" >
               <h2>MERCI</h2>
               <p>${orderId}</p>
               <p>${formatPrice(total)}</p>
               <a href="/" data-router>Retour</a>
            </div>
         </section>
      `;
   },
};
