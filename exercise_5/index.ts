import { empty, interval, Observable, of } from 'rxjs';
import { concatMap, delay, take } from 'rxjs/operators';

/**
 * Objective:
 * There are 3 source observables emitting at a random pace.
 * When any of the sources emits, request a random number.
 * Anytime a new number is generated, collect and sort all the numbers
 * emitted at the time and log the collection of sorted items on screen.
 *
 * -- INPUT --
 * 100
 * 356
 * 86
 * 72
 *
 * -- OUTPUT --
 * 72
 * 86
 * 100
 * 356
 */

const getDelayedInterval = () => {
  return interval(100).pipe(
    concatMap(val => {
      const delayedTime = Math.floor(Math.random() * 9000);
      return of(val).pipe(delay(delayedTime));
    }),
    take(30)
  );
};

// Request a random number
const requestRandomNumber = (): Observable<number> => {
  // Simulation of api response
  const delayedTime = Math.floor(Math.random() * 3000);
  return of(Math.floor(Math.random() * 1000)).pipe(delay(delayedTime));
};

// Helper function to sort emitted numbers ascendantly
const sort = (values, value) => {
  values.push(value);
  return values.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

const event1$ = getDelayedInterval();
const event2$ = getDelayedInterval();
const event3$ = getDelayedInterval();

// Your code here!
const output$: Observable<number[]> = empty();

// utilities to log the output, ignore...
const container = document.querySelector('.rows');
const log = (numbers: number[]) => {
  console.log(numbers);

  if (!Array.isArray(numbers)) return;

  while (container.lastElementChild)
    container.removeChild(container.lastElementChild);

  for (const n of numbers) {
    const row = document.createElement('div');
    row.innerText = n.toString();
    container.appendChild(row);
  }

  window.scrollTo(0, document.body.scrollHeight);
};

output$.subscribe(log);
