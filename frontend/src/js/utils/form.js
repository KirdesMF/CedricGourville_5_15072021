/**
 *
 * @param {string} value
 */
export function checkInputEmail(value) {
   if (!value.includes('@')) {
      console.log('wrong');
   }

   return value;
}
