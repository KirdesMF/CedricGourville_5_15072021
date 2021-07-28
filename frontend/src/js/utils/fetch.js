import { useStorage } from './local-storage';

export async function getDatasApi(path) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}`);
      if (!res.ok) {
         console.log(res.status);
         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}

export async function getImagesApi(path, id) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}/${id}`);

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
 * @param {*} category
 * @param {*} order
 */
export function postCommand(category, order) {
   fetch(`http://localhost:3000/api/${category}/order`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
   })
      .then((res) => res.json())
      .then(() => useStorage.cleanShoppingCart(category))
      .catch((err) => alert(err));
}
