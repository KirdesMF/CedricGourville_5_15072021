/**
 *
 * @param {string} event
 */
export function triggerEvent(event) {
   const customEvent = new Event(event);
   window.dispatchEvent(customEvent);
}
