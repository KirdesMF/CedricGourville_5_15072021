import { triggerEvent } from './event';
import { useStorage } from './local-storage';

/**
 *
 * @param {string} category
 * @returns
 */
export async function getAllProductsFromAPI(category) {
   const url = `${process.env.HOST || 'http://localhost:3000'}/api/${category}`;
   try {
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
         window.history.pushState({ category }, '', `/${category}/error`);
         triggerEvent('update');
         return;
      }
      return json;
   } catch (err) {
      window.history.pushState({ category }, '', `/${category}/error`);
      triggerEvent('update');

      return null;
   }
}

/**
 *
 * @param {string} category
 * @param {string} id
 * @returns
 */
export async function getProductFromAPI(category, id) {
   const url = `${
      process.env.HOST || 'http://localhost:3000'
   }/api/${category}/${id}`;
   try {
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
         window.history.pushState({ category }, '', `/${category}/error`);
         triggerEvent('update');
         return;
      }

      return json;
   } catch (err) {
      window.history.pushState({ category }, '', `/${category}/error`);
      triggerEvent('update');
      return null;
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
export async function postOrder(category, order) {
   const url = `${
      process.env.HOST || 'http://localhost:3000'
   }/api/${category}/order`;

   try {
      const res = await fetch(url, {
         method: 'POST',
         body: JSON.stringify(order),
         headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      const json = await res.json();

      sessionStorage.setItem('orderId', json.orderId);
      useStorage.cleanCategory(category);

      window.history.pushState({ category }, '', `/${category}/success`);
      triggerEvent('update');

      return json;
   } catch (error) {
      window.history.pushState({ category }, '', `/${category}/error`);
      triggerEvent('update');
      return null;
   }
}
