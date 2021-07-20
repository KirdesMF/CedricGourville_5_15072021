import { useLocalStorage } from '../utils/local-storage';

export const ShoppingCart = {
   render: () => {
      const storage = useLocalStorage.getAllItems();
      console.log(window.localStorage);
      return `
         <section>
            <h2>Panier</h2>
         </section>
      `;
   },
};
