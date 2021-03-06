import { getAllProductsFromAPI } from '../utils/fetch';
import { formatPrice } from '../utils/utils';

/**
 * @typedef {object} Product
 * @property {string} name
 * @property {string} price
 * @property {string} _id
 * @property {string} imageUrl
 **/

/**
 *
 * @param {Product[]} datas
 * @param {string} category
 * @returns
 */
const Cards = (datas, category) => {
   return datas
      .map((data) => {
         const { _id, name, price, imageUrl } = data;
         const href = `/${category}/product?id=${_id}`;

         return /*html */ `
            <a href="${href}" data-router class="category__card">
               <img loading="lazy" src="${imageUrl}" />
               <div>
                  <h2>${name}</h2>
                  <small>${formatPrice(price)}</small>
               </div>
            </a>
         `;
      })
      .join('');
};

async function render() {
   const category = window.history.state.category;
   const datas = await getAllProductsFromAPI(category);
   const cards = Cards(datas, category);

   return /* html */ `
      <section class="category panel h100 grid">
         <div class="wrapper grid-flow">
            <div class="category__title" >
               <h1>${category}</h1>
               <a href="/" data-router class="back">
                  <svg
                     class="svg-icon"
                     focusable="false"
                     role="img"
                     aria-hidden="true"
                  >
                     <use href="#chevron-icon" />
                  </svg>
                  <span>Back</span>
               </a>
            </div>
            <div class="category__grid">
               ${cards}
               <div class="category__placeholder">
                  <h3>More to come</h3>
               </div>
            </div>
         </div>
      </section>
   `;
}

export const Category = {
   render,
};
