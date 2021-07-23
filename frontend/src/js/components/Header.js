export const Header = {
   render: () => {
      const path = window.location.pathname;

      return /* html */ `
         <header class="header panel">
            <div class="wrapper">
               <div class="header__inner">
                  <button>
                     <svg
                        class="svg-icon"
                        focusable="false"
                        role="img"
                        aria-hidden="true"
                     >
                        <use href="#menu-icon" />
                     </svg>
                  </button>

                  <a href="/" data-router="true">
                     <svg
                        class="svg-icon"
                        focusable="false"
                        role="img"
                        aria-hidden="true"
                     >
                        <use href="#orinoco-chars" />
                     </svg>
                  </a>

                  <a href="/shopping-cart" data-router="true" id="shopping-link" >
                     <svg
                        class="svg-icon"
                        focusable="false"
                        role="img"
                        aria-hidden="true"
                     >
                        <use href="#orinoco-icon" />
                     </svg>
                  </a>
               </div>
            </div>
         </header>
      `;
   },
};
