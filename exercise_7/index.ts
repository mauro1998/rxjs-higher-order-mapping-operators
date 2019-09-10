import { empty, fromEvent, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { handleLogin } from './login';

/**
 * Objective:
 * Complete the implementation of the login screen.
 * Take into account that performing many requests
 * at the same time can knock down the server a few seconds.
 * Write a solution that prevents this behavior.
 *
 * Valid credentials:
 * username: admin
 * password: 1234
 */

// HTML element refs
const form: HTMLElement = document.querySelector('form');
const dashboard: HTMLElement = document.querySelector('.dashboard');
const input1 = document.querySelector('input[name=username]') as HTMLInputElement;
const input2 = document.querySelector('input[name=password]') as HTMLInputElement;
const feedback: HTMLElement = document.querySelector('.msg');

// Some helper functions...
const getFormData = () => {
  return {
    username: input1.value.trim(),
    password: input2.value.trim(),
  };
};

const isValidFormat = (data): boolean => !!(data.username && data.password);
const clearFeedbackText = () => (feedback.textContent = '');
const showLoader = () => (feedback.textContent = 'Loading...');
const checkRequiredFields = data => {
  if (!isValidFormat(data)) {
    feedback.textContent = 'All fields are required';
    if (!input1.value) input1.focus();
    else if (!input2.value) input2.focus();
  }
};

// this function can perform your login request
// returns 1 if credentials are valid
// returns 0 if credentials are invalid
// returns -1 if an error ocurred
const login = (credentials): Observable<number> => {
  return handleLogin(credentials.username, credentials.password).pipe(
    map(valid => (valid ? 1 : 0)),
    catchError(err => {
      console.error(err);
      return of(-1);
    })
  );
};

const submit$ = fromEvent(form, 'submit').pipe(
  tap(e => e.preventDefault()),
  map(getFormData)
);

interface Credentials {
  username: string;
  password: string;
}

// this observable emits the credentials provided by the user
const credentials$: Observable<Credentials> = submit$.pipe(
  tap(checkRequiredFields),
  filter(isValidFormat),
  tap(() => {
    clearFeedbackText();
    showLoader();
  })
);

// Your code here!
const login$ = empty();

// log utilities, ignore...
const log = (msg: string) => (feedback.textContent = msg);
const show = (node: HTMLElement) => (node.style.display = 'block');
const hide = (node: HTMLElement) => (node.style.display = 'none');
const prepareLogout = () => {
  const btn = document.querySelector('.logout');
  btn.addEventListener('click', () => {
    hide(dashboard);
    show(form);
  }, { once: true });
};

login$.subscribe(responseNumber => {
  switch (responseNumber) {
    case 1: {
      input1.value = input2.value = feedback.textContent = '';
      hide(form);
      show(dashboard);
      prepareLogout();
      break;
    }

    case 0: {
      log('Invalid username or password');
      break;
    }

    case -1: {
      log('Error 500 - An unexpected error ocurred, please try again');
      break;
    }
  }
});
