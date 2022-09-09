import { SenhaPipe } from './senha.pipe';

describe('SenhaPipe', () => {

  const pipe = new SenhaPipe();
  
  it('transformar senha em asteristicos', () => {
    expect(pipe.transform('12345')).toBe('*****');
  });

});
