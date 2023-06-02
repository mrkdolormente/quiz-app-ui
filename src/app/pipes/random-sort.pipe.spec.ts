import { QUESTIONS } from '../constants/questions';
import { RandomSortPipe } from './random-sort.pipe';

describe('RandomSortPipe', () => {
  let pipe: RandomSortPipe;

  beforeEach(() => {
    pipe = new RandomSortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should randomly sort an array', () => {
    const inputArray = QUESTIONS;
    const sortedArray = pipe.transform(inputArray);

    expect(sortedArray).not.toBe(inputArray);
    expect(sortedArray.length).toBe(inputArray.length);
    expect(sortedArray).not.toEqual(inputArray);
  });

  it('should return an empty array for empty input', () => {
    const inputArray: Array<unknown> = [];
    const sortedArray = pipe.transform(inputArray);

    expect(sortedArray).toEqual([]);
  });
});
