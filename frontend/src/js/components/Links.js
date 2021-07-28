const LINKS_DATA = [
   { path: '/teddies', text: 'Teddies', icon: '#teddy-icon' },
   { path: '/cameras', text: 'Cameras', icon: '#camera-icon' },
   { path: '/furniture', text: 'Furnitures', icon: '#furniture-icon' },
];

export const Link = LINKS_DATA.map(
   (link) => `
      <a href="${link.path}" data-router="true">
         ${link.text}
         <span>
            <svg
               class="svg-icon"
               focusable="false"
               role="img"
               aria-hidden="true"
            >
               <use href="${link.icon}" />
            </svg>
         </span>
      </a>
   `
).join('');

export const LinkMenu = LINKS_DATA.map(
   (link) => `
      <a href="${link.path}" data-router="true">
         ${link.text}
      </a>
   `
).join('');
