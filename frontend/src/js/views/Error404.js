function render() {
   return /* html */ `
         <section class="panel">
            <div class="wrapper">
               <h1>404</h1>
               <a href="/" data-router="true">Error you should go back</a>
            </div>
         </section>
      `;
}

export const Error404 = {
   render,
};
