/**
 *
 * @param {string} pathname
 * @returns
 */
export const getLastPathname = (pathname) =>
   pathname.substring(pathname.lastIndexOf('/'));
