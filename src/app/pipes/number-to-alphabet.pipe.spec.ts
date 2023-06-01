import { NumberToAlphabetPipe } from './number-to-alphabet.pipe';

describe('NumberToAlphabetPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToAlphabetPipe();
    expect(pipe).toBeTruthy();
  });
});
