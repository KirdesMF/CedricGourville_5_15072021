import {
   checkRouterPath,
   getOptions,
   getRowTotalPrice,
   getTableTotalPrice,
   parseStringToNumber,
   setPathToCategory,
} from '../utils/utils';

describe('get options product from datas', () => {
   test('if category is teddies options shoud be colors', () => {
      expect(getOptions('teddies')).toBe('colors');
   });

   test('if category is cameras options shoud be colors', () => {
      expect(getOptions('cameras')).toBe('lenses');
   });

   test('if category is furniture options shoud be colors', () => {
      expect(getOptions('furniture')).toBe('varnish');
   });
});

describe('convert string to an number', () => {
   test('if text is 999999 should return the same as number', () => {
      expect(parseStringToNumber('999999')).toBe(999999);
   });

   test('if string is 0.01 should return the same as number', () => {
      expect(parseStringToNumber('0.01')).toBe(0.01);
   });
});

describe('return the category string from pathname', () => {
   test('if pathname is / should return all', () => {
      expect(setPathToCategory('/')).toBe('all');
   });
   test('if pathname is /all/success should return all', () => {
      expect(setPathToCategory('/all/success')).toBe('all');
   });
   test('if pathname is /teddies should return teddies', () => {
      expect(setPathToCategory('/teddies')).toBe('teddies');
   });
   test('if pathname is /cameras should return cameras', () => {
      expect(setPathToCategory('/cameras')).toBe('cameras');
   });
   test('if pathname is /furniture should return furniture', () => {
      expect(setPathToCategory('/furniture')).toBe('furniture');
   });
   test('if pathname is /teddies/shopping-cart  should return teddies', () => {
      expect(setPathToCategory('/teddies/shopping-cart')).toBe('teddies');
   });
});

const teddiesDatas = [
   {
      quantity: 10,
      category: 'teddies',
      name: 'test',
      price: '9900',
      id: 'randomId',
      option: [],
   },
   {
      quantity: 10,
      category: 'teddies',
      name: 'test',
      price: '7900',
      id: 'randomId',
      option: [],
   },
   {
      quantity: 10,
      category: 'teddies',
      name: 'test',
      price: '10000',
      id: 'randomId',
      option: [],
   },
];
const camerasDatas = [
   {
      quantity: 1,
      category: 'cameras',
      name: 'test',
      price: '74900',
      id: 'randomId',
      option: [],
   },
   {
      quantity: 5,
      category: 'cameras',
      name: 'test',
      price: '159900',
      id: 'randomId',
      option: [],
   },
   {
      quantity: 9,
      category: 'cameras',
      name: 'test',
      price: '49900',
      id: 'randomId',
      option: [],
   },
];

describe('get non formatted total price of table shopping cart', () => {
   test('The non formatted Total price of cameras shopping cart', () => {
      expect(getTableTotalPrice(camerasDatas)).toBe(1323500);
   });
   test('The non formatted Total price of teddies shopping cart', () => {
      expect(getTableTotalPrice(teddiesDatas)).toBe(278000);
   });
});

describe('get non formatted total price of one table row of shopping cart', () => {
   test('total row quantity', () => {
      expect(getRowTotalPrice(2, '9900')).toBe(19800);
   });
});

describe('return path to render view', () => {
   test('home path', () => {
      expect(checkRouterPath('/', 'http://localhost:1234/')).toBe('/');
   });

   test('shopping cart path', () => {
      expect(
         checkRouterPath(
            '/teddies/shopping-cart',
            'http://localhost:1234//teddies/shopping-cart'
         )
      ).toBe('/shopping-cart');
   });
});
