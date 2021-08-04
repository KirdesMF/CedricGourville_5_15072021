const { triggerEvent } = require('../utils/event');

describe('trigger event', () => {
   it('window is dispatchning custom event', () => {
      const mockDispatch = jest.spyOn(window, 'dispatchEvent');

      triggerEvent('update');
      expect(mockDispatch).toHaveBeenCalled();
   });
});
