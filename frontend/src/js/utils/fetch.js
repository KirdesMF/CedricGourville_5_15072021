import { triggerEvent } from './event';
import { useStorage } from './local-storage';

/**
 *
 * @param {string} category
 * @returns
 */
export async function getAllProductsFromAPI(category) {
   try {
      const res = await fetch(`${process.env.HOST}/api/${category}`);
      if (!res.ok) {
         console.log(res.status);
         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}

/**
 *
 * @param {string} category
 * @param {string} id
 * @returns
 */
export async function getProductFromAPI(category, id) {
   const url = `${process.env.HOST}/api/${category}/${id}`;
   try {
      const res = await fetch(url);

      if (!res.ok) {
         console.log(res.status);

         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}

/**
 *
 * @typedef {{[key: string]: string}} Contact
 * @typedef {string[]} Products
 *
 * @param {string} category
 * @param {Contact & Products} order
 *
 */
export function postOrder(category, order) {
   fetch(`${process.env.HOST}/api/${category}/order`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
   })
      .then((res) => res.json())
      .then((json) => {
         sessionStorage.setItem('orderId', json.orderId);
         useStorage.cleanCategory(category);

         window.history.pushState({ category }, '', `/${category}/success`);
         triggerEvent('update');
      })
      .catch((err) => alert(err));
}
