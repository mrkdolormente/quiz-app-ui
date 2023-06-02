import { NumberToAlphabetPipe } from './number-to-alphabet.pipe';

describe('NumberToAlphabetPipe', () => {
  let pipe: NumberToAlphabetPipe;

  beforeEach(() => {
    pipe = new NumberToAlphabetPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return A when value is 0', () => {
    const character = pipe.transform(0);

    expect(character).toEqual('A');
  });

  it('should return B when value is 1', () => {
    const character = pipe.transform(0);

    expect(character).toEqual('B');
  });

  it('should return C when value is 2', () => {
    const character = pipe.transform(2);

    expect(character).toEqual('C');
  });

  it('should return D when value is 3', () => {
    const character = pipe.transform(3);

    expect(character).toEqual('D');
  });
});
