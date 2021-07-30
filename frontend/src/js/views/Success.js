import { formatPrice } from '../utils/utils';

export const Success = {
   render: () => {
      const category = history.state.category;
      const orderId = sessionStorage.getItem('orderId');
      const total = sessionStorage.getItem(`${category}-total`);

      return /*html */ `
         <section>
            <h2>MERCI</h2>
            <p>${orderId}</p>
            <p>${formatPrice(total)}</p>
            <a href="/" data-router="true" >Retour</a>
         </section>
      `;
   },
};
