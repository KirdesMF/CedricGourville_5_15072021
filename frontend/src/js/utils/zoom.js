export const setZoom = (e) => {
   const imageZoom = e.currentTarget;
   let offsetX;
   let offsetY;
   let x;
   let y;

   e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
   e.offsetY ? (offsetY = e.offsetY) : (offsetY = e.touches[0].pageY);
   x = (offsetX / imageZoom.offsetWidth) * 100;
   y = (offsetY / imageZoom.offsetHeight) * 100;

   imageZoom.style.transform = `translate(${x}px, ${y}px)`;
};
