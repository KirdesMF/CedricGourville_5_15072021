const navigation = [
   { name: 'Home', href: '/' },
   { name: 'Teddies', href: '/teddies' },
   { name: 'Cameras', href: '/cameras' },
   { name: 'Furnitures', href: '/furniture' },
];

const render = async () => {
   return /* html */ `
      <div id="menu" class="menu panel" >
         <div class="wrapper h100 menu__inner" >
            <button id="close-menu">
               <svg
                  class="svg-icon"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
               >
                  <use href="#close-icon" />
               </svg>
            </button>
            <nav>
               ${navigation
                  .map(
                     (anchor) => `
                        <a data-router href="${anchor.href}">${anchor.name}</a>
                     `
                  )
                  .join('')}
            </nav>
         </div>
      </div>
   `;
};

const set = (isOpen) => {
   const aside = document.getElementById('menu');

   //TODO make a function to trigger custom event
   const customEvent = new Event('menu');
   window.dispatchEvent(customEvent);

   aside.addEventListener('click', (event) => {
      if (
         event.target.matches('#close-menu') ||
         event.target.matches('a[data-router]')
      ) {
         aside.animate(
            [
               { transform: 'translateX(0%)' },
               { transform: 'translateX(-100%)' },
            ],
            {
               duration: 500,
            }
         ).onfinish = () => {
            aside.remove();
            isOpen = false;
         };
      }
   });
};

export function Menu() {
   const btn = document.getElementById('btn-menu');
   const body = document.body;
   let isOpen = false;

   btn.addEventListener('click', async () => {
      isOpen = true;

      if (isOpen) {
         const menu = await render();
         body.insertAdjacentHTML('afterbegin', menu);
         set(isOpen);
      }
   });
}

window.addEventListener('load', Menu);
