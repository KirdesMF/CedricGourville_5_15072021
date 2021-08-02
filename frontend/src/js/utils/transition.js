export function transitionView(keyframes, onFinish = null) {
   const app = document.getElementById('app');
   app.animate(keyframes, { duration: 500, fill: 'both' }).onfinish = onFinish;
}
