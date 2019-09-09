import { empty, fromEvent, interval, Observable } from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  pluck,
  startWith,
  tap,
} from 'rxjs/operators';

/**
 * Objective:
 * There are 3 message generators that post random messages on screen.
 * A 4th source comes from the user input, like a chat room!.
 * Find a way to log the 4 sources as they come in and post them to the screen.
 * Avoid multiple subscriptions.
 *
 * -- INPUT --
 * Hello world!
 * ...
 * Hello world again!
 *
 * -- OUTPUT --
 * Automatic random message 1
 * Hello world!
 * Automatic random message 2
 * Automatic random message 3
 * Hello world again!
 */

// Helpers
const api1 = 'https://api.kanye.rest';
const api2 = 'https://geek-jokes.sameerkumar.website/api';
const api3 = 'https://api.chucknorris.io/jokes/random?category=explicit';

const makeGetRequest = url => {
  return Observable.create(observer => {
    const request = fetch(url).then(res => res.json());
    request
      .then(res => {
        observer.next({ response: res });
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });
};

const getDelayedInterval = () => {
  return interval(100).pipe(
    concatMap(() => {
      const delayedTime = Math.floor(Math.random() * 15000) + 2000;
      return empty().pipe(
        startWith(delayedTime),
        delay(delayedTime)
      );
    })
  );
};

const getRandomMessages = (url, params) => {
  const path = params.split('.');
  const interval$ = getDelayedInterval();
  return interval$.pipe(
    concatMap(() => makeGetRequest(url)),
    pluck.apply(null, path)
  );
};

const container = document.querySelector('.container');
const input = document.querySelector('p');

// Capture text from event
const text$ = fromEvent(input, 'keydown').pipe(
  filter((e: KeyboardEvent) => e.keyCode === 13),
  tap(e => e.preventDefault()),
  pluck('target', 'textContent'),
  filter((text: string) => !!text.trim()),
  tap(() => (input.textContent = ''))
);

// Some utilities to log the output, ignore...
const log = (text: string) => {
  const message = document.createElement('div');
  message.classList.add('msg');
  message.textContent = text;
  container.appendChild(message);
  window.scrollTo(0, document.body.scrollHeight);
};

const source1$ = getRandomMessages(api1, 'response.quote');
const source2$ = getRandomMessages(api2, 'response');
const source3$ = getRandomMessages(api3, 'response.value');
const source4$ = text$;

// Your code goes here!
// How can we log the messages without making so many subscriptions?
source1$.subscribe(log);
source2$.subscribe(log);
source3$.subscribe(log);
source4$.subscribe(log);
