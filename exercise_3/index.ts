import { empty, fromEvent } from 'rxjs';
import { delay, map, pluck, startWith } from 'rxjs/operators';

/**
 * Objective:
 * Each button makes a request.
 * The number in the button determines the time
 * in seconds each request takes to complete.
 * Click the buttons and output the result of each
 * request in the same order they were clicked. i.e:
 *
 * -- INPUT --
 * If the buttons are clicked in the following order:
 * [3s] [1s] [2s] [1s]
 *
 * -- OUTPUT --
 * 3s request finished (delayed 3s)
 * 1s request finished (delayed 1s)
 * 2s request finished (delayed 2s)
 * 1s request finished (delayed 1s)
 */

const makeRequest = (delayTime: number = 1) => {
  // simulate request
  return empty().pipe(
    startWith(delayTime),
    map(() => `${delayTime}s request finished`),
    delay(delayTime * 1000)
  );
};

const buttons = document.querySelectorAll('button');

const input$ = fromEvent(buttons, 'click').pipe(
  pluck('target'),
  map((target: HTMLElement) => {
    const val = target.getAttribute('data-value');
    return Number(val);
  })
);

// Your code goes here:
const output$ = input$.pipe(map(x => makeRequest(x)));

// log utilities, ignore...
output$.subscribe(x => console.log(x));
