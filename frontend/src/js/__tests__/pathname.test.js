import { getLastPathname } from '../utils/pathname';

test('if pathname is /test/shopping should return test', () => {
   expect(getLastPathname('/test/shopping')).toBe('/shopping');
});
