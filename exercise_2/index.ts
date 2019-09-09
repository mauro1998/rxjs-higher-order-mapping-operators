import { merge, empty } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

/**
 * Objective:
 * Sequentially output the following messages in intervals of 1 second:
 *
 * 'Ready?', '3', '2', '1', 'Go!'
 *
 * Output the final result. i.e:
 *
 * -- OUTPUT --
 * Ready?
 * 3
 * 2
 * 1
 * Go!
 */

const userMessage = document.getElementById('message');

// Helper function to create a delayed message
const delayedMessage = (message: string, delayedSeconds: number = 1) => {
  return empty().pipe(
    startWith(message),
    delay(delayedSeconds * 1000)
  );
};

// Here is a sample code using merge, can you make it better?
// Your code goes here:
const output$ = merge(
  delayedMessage('This', 0),
  delayedMessage('This is', 1),
  delayedMessage('This is a', 2),
  delayedMessage('This is a delayed', 3),
  delayedMessage('This is a delayed message', 4),
  delayedMessage('This is a delayed message sample.', 5),
  delayedMessage('This is a delayed message sample.<br>Refactor it!', 6)
);

// log utilities, ignore...
const log = (message: string) => (userMessage.innerHTML = message);
output$.subscribe(log);
