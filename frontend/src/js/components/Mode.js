function setDarkMode() {
   const input = document.querySelector('[data-mode="checkbox"]');
   const root = document.documentElement;
   const currentMode = localStorage.getItem('mode');

   if (currentMode) {
      root.dataset.mode = currentMode;

      if (currentMode === 'dark') {
         input.checked = true;
      }
   }

   input.addEventListener(
      'change',
      (event) => {
         if (event.target.checked) {
            root.dataset.mode = 'dark';
            localStorage.setItem('mode', 'dark');
         } else {
            root.dataset.mode = 'light';
            localStorage.setItem('mode', 'light');
         }
      },
      false
   );
}

window.addEventListener('load', setDarkMode);
