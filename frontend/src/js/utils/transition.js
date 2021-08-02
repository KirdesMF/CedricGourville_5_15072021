/**
 *
 * @param {object[]} keyframes
 * @param {() => void | null} onFinish
 */
export function transitionView(keyframes, onFinish = null) {
   const app = document.getElementById('app');
   app.animate(keyframes, { duration: 500, fill: 'both' }).onfinish = onFinish;
}

export const countKeyframes = [
   { transform: 'translateY(0px)', opacity: 0 },
   { transform: 'translateY(-20px)', opacity: 1 },
   { transform: 'translateY(-35px)', opacity: 0 },
];

export const errorKeyframes = [
   { transform: 'translate(-50%, 0px) ', opacity: 0 },
   {
      transform: 'translate(-50%, 25px)',
      opacity: 1,
      offset: 0.2,
   },
   { transform: 'translate(-50%, 25px)', opacity: 1 },
   {
      transform: 'translate(-50%, 0px)',
      opacity: 0,
      offset: 0.9,
   },
];

export const optionsAnimation = {
   duration: 600,
   easing: 'ease-in',
};
