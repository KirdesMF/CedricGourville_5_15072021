import { useStorage } from './local-storage';

/**
 *
 * @param {string} path
 * @returns
 */
export async function getDatasApi(category) {
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
 * @param {string} path
 * @param {string} id
 * @returns
 */
export async function getImagesApi(category, id) {
   try {
      const res = await fetch(`${process.env.HOST}/api/${category}/${id}`);

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
 * @param {object} order
 */
export function postCommand(category, order) {
   fetch(`${process.env.HOST}/api/${category}/order`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
   })
      .then((res) => res.json())
      .then((json) => {
         console.log(json);
         useStorage.cleanCategory(category);
         // window.location.href = '/success';
      })
      .catch((err) => alert(err));
}
