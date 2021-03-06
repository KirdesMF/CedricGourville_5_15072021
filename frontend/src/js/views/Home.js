import { Link } from '../components/Links';

function render() {
   return /* html */ `
         <section class="h100 grid grid-items-center">
            <nav class="home__nav wrapper grid-flow">
               ${Link}
            </nav>
         </section>
      `;
}

export const Home = {
   render,
};
