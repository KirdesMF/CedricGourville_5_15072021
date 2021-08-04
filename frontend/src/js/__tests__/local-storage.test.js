import { useStorage } from '../utils/local-storage';

const item = {
   category: 'teddies',
   name: 'henry',
   quantity: 2,
   option: 'red',
   price: '9900',
   id: '',
};

beforeAll(() => {
   jest.spyOn(window.localStorage.__proto__, 'getItem');
   jest.spyOn(window.localStorage.__proto__, 'setItem');
   jest.spyOn(window.localStorage.__proto__, 'clear');
});

afterEach(() => {
   window.localStorage.clear();
});

describe('use local storage / shopping-cart method', () => {
   describe('check local storage state', () => {
      test('if its empty should return false', () => {
         useStorage.addItem(item);
         expect(localStorage.setItem).toHaveBeenCalled();
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsEmpty()).toBeFalsy();
      });

      test('if not empty should return true', () => {
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsEmpty()).toBeTruthy();
      });
   });

   describe('add a product to a category', () => {
      test('should return true and add an item', () => {
         useStorage.addItem(item);
         useStorage.getProductFromCategory('teddies');

         expect(localStorage.setItem).toHaveBeenCalled();
         expect(localStorage.getItem).toHaveBeenCalled();

         expect(useStorage.getProductFromCategory('teddies')).toEqual([item]);
         expect(useStorage.addItem(item)).toBeFalsy();
      });
   });

   test('get products when category is empty or not created', () => {
      expect(useStorage.getProductFromCategory('cameras')).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalled();
   });

   describe('check if category is empty', () => {
      test('when category teddies is not empty', () => {
         useStorage.addItem(item);
         expect(localStorage.setItem).toHaveBeenCalled();
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsCategoryEmpty('teddies')).toBeFalsy();
      });

      test('when category teddies is empty', () => {
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsCategoryEmpty('teddies')).toBeTruthy();
      });
   });

   describe('get all keys / categories', () => {
      test('when an item is present', () => {
         useStorage.addItem(item);
         expect(localStorage.setItem).toHaveBeenCalled();
         expect(useStorage.getAllKeys()).toEqual(['teddies']);
      });

      test('when its empty', () => {
         expect(useStorage.getAllKeys()).toEqual([]);
      });
   });

   describe('check quantity product', () => {
      test('is max', () => {
         useStorage.addItem({ ...item, quantity: 11 });
         expect(localStorage.setItem).toHaveBeenCalled();

         expect(useStorage.addItem({ ...item, quantity: 11 })).toBeTruthy();
         expect(useStorage.getProductFromCategory('teddies')[0].quantity).toBe(
            10
         );
      });
   });

   describe('edit product already in cart', () => {
      test('', () => {
         useStorage.addItem({ ...item, quantity: 5 });
         useStorage.updateItem({
            category: item.category,
            name: item.name,
            option: 'red',
            quantity: 2,
         });

         expect(useStorage.getProductFromCategory('teddies')[0].quantity).toBe(
            2
         );
      });
   });

   describe('remove item from shopping cart', () => {
      test('', () => {
         useStorage.addItem(item);
         useStorage.removeItem({
            category: item.category,
            name: item.name,
            option: 'red',
         });

         expect(useStorage.getProductFromCategory('teddies')).toEqual([]);
      });
   });

   describe('clear category', () => {
      test('after validate cart, remove category', () => {
         useStorage.addItem(item);
         useStorage.cleanCategory('teddies');
         expect(useStorage.getProductFromCategory('teddies')).toEqual([]);
      });
   });
});
