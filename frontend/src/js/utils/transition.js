export function transitionView(keyframes, onFinish = {}) {
   const app = document.getElementById('app');
   app.animate(keyframes, { duration: 500, fill: 'both' }).onfinish = onFinish;
}
