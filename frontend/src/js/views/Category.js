import { getAllProductsFromAPI } from '../utils/fetch';
import { formatPrice } from '../utils/utils';

/**
 *
 * @param {*} datas
 * @param {string} category
 * @returns
 */
const Cards = (datas, category) => {
   return datas
      .map((data) => {
         const { _id, name, price, imageUrl } = data;
         const href = `/${category}?id=${_id}`;

         return /*html */ `
            <a href="${href}" data-router class="article__card">
               <img width="320" height="240" src="${imageUrl}" />
               <div>
                  <h2>${name}</h2>
                  <small>${formatPrice(price)}</small>
               </div>
            </a>
         `;
      })
      .join('');
};

export const Category = {
   render: async () => {
      const category = window.history.state.category;
      const datas = await getAllProductsFromAPI(category);
      const cards = Cards(datas, category);

      return /* html */ `
         <section class="article panel h100 grid grid-center">
            <div class="wrapper grid-flow" id="myContainer">
               <div>
                  <h1>${category}</h1>
                  <a href="/" data-router>Back</a>
               </div>
               <div class="article__grid">${cards}</div>
            </div>
         </section>
      `;
   },
};
