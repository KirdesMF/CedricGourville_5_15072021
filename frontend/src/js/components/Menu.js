const { setLinkRouter } = require('../router/router');
const { Link, LinkMenu } = require('./Links');

const Menu = {
   render: async () => {
      return /*html */ `
         <div id="menu" class="menu" >
            <button id="close-btn"> Close </button>
            <nav>
               ${LinkMenu}
            </nav>
         </div>
   `;
   },
   set: () => {
      const btn = document.getElementById('close-btn');

      setLinkRouter();

      btn.addEventListener('click', () => {
         const menu = document.getElementById('menu');
         menu.remove();
      });
   },
};

function handleMenu() {
   const btn = document.getElementById('btn-menu');

   btn.addEventListener('click', async () => {
      document.body.insertAdjacentHTML('afterbegin', await Menu.render());
      Menu.set();
   });
}

window.addEventListener('load', handleMenu);
