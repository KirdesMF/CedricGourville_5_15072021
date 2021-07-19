export function formatPrice(price) {
   return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
   }).format(price / 100);
}

export function addToLocalStorage(category, price) {
   window.localStorage.setItem(category, JSON.parse(price));
}

Storage.prototype.setObject = function (key, value) {
   this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
   const value = this.getItem(key);
   if (!value) {
      return;
   }
   return JSON.parse(value);
};

const options = {
   teddies: 'colors',
   cameras: 'lenses',
   furniture: 'varnish',
};

export function getOptionsFromDatas(path) {
   return options[path];
}
