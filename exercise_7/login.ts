import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Backend auth API simulator:
 */

// valid credentials
const username = 'admin';
const password = '1234';

// ongoing requests
const requests = [];
let recovering = false;

export const handleLogin = (
  user: string,
  pass: string
): Observable<boolean> => {
  // simulate server-side login operation
  // several login requests can block the server
  const subject = new Subject<boolean>();
  const valid = user === username && pass === password;
  const responseTime = Math.floor(Math.random() * 2000) + 500;

  if (recovering) {
    subject.error('Error 500 Too many requests - The server crashed');
    subject.complete();
  } else {
    const subscription = of(valid)
      .pipe(delay(responseTime))
      .subscribe(valid => {
        if (requests.length > 3) {
          // kill ongoing subs
          requests.forEach(sub => sub.unsubscribe());
          requests.length = 0;
          recovering = true;
          setTimeout(() => (recovering = false), 3000);
          subject.error('Error 500 Too many requests - The server crashed');
          subject.complete();
        } else {
          const index = requests.indexOf(subscription);
          requests.splice(index, 1); // release the subscription
          subject.next(valid);
          subject.complete();
        }
      });

    requests.push(subscription);
  }

  return subject.asObservable();
};
