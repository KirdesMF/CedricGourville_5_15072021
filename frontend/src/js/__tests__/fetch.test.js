const { triggerEvent } = require('../utils/event');
const {
   getAllProductsFromAPI,
   getProductFromAPI,
   postOrder,
} = require('../utils/fetch');
const { setPathToCategory } = require('../utils/utils');

beforeEach(() => {
   fetch.resetMocks();
});

const fakeProduct = {
   _id: '123',
   name: 'henry',
   option: ['blue', 'red', 'green'],
   description: 'test description',
   price: 9900,
};

describe('all product from api', () => {
   it('success all product', async () => {
      fetch.mockResponseOnce(JSON.stringify([fakeProduct]));
      const path = setPathToCategory('/teddies');
      const product = await getAllProductsFromAPI(path);

      expect(product).toEqual([fakeProduct]);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
         `${process.env.HOST || 'http://localhost:3000'}/api/${path}`
      );
   });

   it('fail all product', async () => {
      fetch.mockReject(() => Promise.reject('API is down'));
      const product = await getAllProductsFromAPI('teddies');

      expect(product).toEqual(null);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
         `${process.env.HOST || 'http://localhost:3000'}/api/teddies`
      );
   });
});

describe('get one product from api', () => {
   it('success one product', async () => {
      fetch.mockResponseOnce(JSON.stringify(fakeProduct));
      const path = setPathToCategory('/teddies');
      const product = await getProductFromAPI(path, '123');

      expect(product).toEqual(fakeProduct);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
         `${process.env.HOST || 'http://localhost:3000'}/api/${path}/123`
      );
   });

   it('fail one product', async () => {
      fetch.mockReject(() => Promise.reject('API is down'));
      const product = await getProductFromAPI('teddies', '123');

      expect(product).toEqual(null);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
         `${process.env.HOST || 'http://localhost:3000'}/api/teddies/123`
      );
   });
});

const success = {
   contact: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      email: '',
   },
   products: [fakeProduct],
};
describe('post to api', () => {
   it('success', async () => {
      fetch.mockResponseOnce(JSON.stringify(response));
      const response = await postOrder('teddies', success);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
         `${process.env.HOST || 'http://localhost:3000'}/api/teddies/order`,
         {
            method: 'POST',
            body: JSON.stringify(success),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
         }
      );
   });
});
