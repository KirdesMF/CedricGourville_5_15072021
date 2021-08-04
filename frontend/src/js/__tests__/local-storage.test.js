import { useStorage } from '../utils/local-storage';

const item = {
   category: 'teddies',
   name: 'henry',
   quantity: 2,
   option: ['', ''],
   price: '9900',
   id: '',
};

const otherItem = {
   category: 'teddies',
   name: 'henry',
   quantity: 15,
   option: ['', ''],
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

describe('use local storage method', () => {
   test('add product to teddies category', () => {
      useStorage.addItem(item);
      useStorage.getProductFromCategory('teddies');

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.getItem).toHaveBeenCalled();

      expect(useStorage.getProductFromCategory('teddies')).toEqual([item]);
   });

   test('get products when category is empty or not created', () => {
      expect(useStorage.getProductFromCategory('cameras')).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalled();
   });

   describe('check if storage is empty', () => {
      test('when storage is not empty', () => {
         useStorage.addItem(item);
         expect(localStorage.setItem).toHaveBeenCalled();
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsEmpty()).toBeFalsy();
      });

      test('when storage is empty', () => {
         expect(localStorage.getItem).toHaveBeenCalled();
         expect(useStorage.checkIsEmpty()).toBeTruthy();
      });
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
         useStorage.addItem(otherItem);
         expect(localStorage.setItem).toHaveBeenCalled();
         expect(useStorage.addItem(otherItem)).toBeTruthy();
      });
   });
});
