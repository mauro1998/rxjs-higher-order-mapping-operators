import { fromEvent, interval } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Objective:
 * Every second a counter emits a value incremented by 1.
 * The updated value is displayed on screen.
 * A restart button has been added to restart the
 * counter everytime the button is clicked.
 * Add the functionality required to make the restart
 * button work as expected. i.e:
 *
 * -- INPUT --
 * [ RESTART ] (button clicked 3s later)
 *
 * -- OUTPUT --
 * 1
 * 2
 * 3
 * 0 (restarted after 3s)
 * 1
 * 2
 * 3
 * ...
 */

const counter = document.querySelector('.counter');
const button = document.querySelector('button');

// Your code here
const restart$ = fromEvent(button, 'click');
const counter$ = interval(1000).pipe(map(x => x + 1));

// log utilities...
counter$.subscribe(x => (counter.textContent = `${x}`));
