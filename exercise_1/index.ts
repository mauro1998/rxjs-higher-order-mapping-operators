import { fromEvent } from 'rxjs';
import { tap, filter, map, pluck } from 'rxjs/operators';

/**
 * Objective:
 * Take the user input and transform the given text by replacing any 'R/r' characters by 'W/w'.
 * Output the final result. i.e:
 *
 * -- INPUT --
 * El burrito barrigón ayer se dio un resbalón
 *
 * -- OUTPUT --
 * El buwwito bawwigón ayew se dio un wesbalón
 */

const container = document.querySelector('.container');
const input = document.querySelector('p');

// Capture text from event
const text$ = fromEvent(input, 'keydown').pipe(
  filter((e: KeyboardEvent) => e.keyCode === 13),
  tap(e => e.preventDefault()),
  pluck('target', 'textContent'),
  filter((text: string) => !!text.trim()),
  tap(() => input.textContent = ''),
);

const output$ = text$.pipe(
  // Your code goes here!
);

// Some utilities to log the output, ignore...
const log = (text: string) => {
  const message = document.createElement('div');
  message.textContent = text;
  container.appendChild(message);
};

output$.subscribe(log);
