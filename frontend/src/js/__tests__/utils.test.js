import {
   formatPrice,
   getOptionsFromDatas,
   parseStringToNumber,
} from '../utils/utils';

test('if category is teddies options shoud be colors', () => {
   expect(getOptionsFromDatas('teddies')).toBe('colors');
});

test('if text is 999999 should return the same as number', () => {
   expect(parseStringToNumber('999999')).toBe(999999);
});
