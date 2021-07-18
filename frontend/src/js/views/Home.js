const LINKS = [
   { path: '/teddies', text: 'Teddies', icon: '#teddy-icon' },
   { path: '/cameras', text: 'Cameras', icon: '#camera-icon' },
   { path: '/furniture', text: 'Furnitures', icon: '#furniture-icon' },
];

const anchors = LINKS.map(
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

export const Home = {
   render: () => {
      return /* html */ `
         <section class="home panel h100">
            <nav class="home__nav wrapper h100">
               ${anchors}
            </nav>
         </section>
      `;
   },
};
