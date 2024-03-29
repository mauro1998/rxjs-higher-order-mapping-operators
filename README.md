# Understanding Higher-Order Mapping Operators in Rxjs

Practical exercises and useful resources to learn about higher-order Rxjs mapping operators, some of the most commonly used Rxjs operators that we find in a daily basis: **switchMap, mergeMap, exhaustMap** and **concatMap**.

## How to put in practice the exercises

1. Open [https://stackblitz.com](stackblitz)
2. Start a new rxjs workspace
3. Copy the contents of the exersice from the folders available in this repo
4. Start having fun!

## Exercise #1

**Objective:**
Take the user input and transform the given text by replacing any 'R/r' characters by 'W/w'.
Output the final result. i.e:

```
 /**
  * -- INPUT --
  * El burrito barrigón ayer se dio un resbalón
  *
  * -- OUTPUT --
  * El buwwito bawwigón ayew se dio un wesbalón
  */
```

## Exercise #2

**Objective:**
Sequentially output the following messages in intervals of 1 second: `'Ready?', '3', '2', '1', 'Go!'`. Output the final result. i.e:

```
 /**
  * -- OUTPUT --
  * Ready?
  * 3
  * 2
  * 1
  * Go!
  */
```

## Exercise #3

**Objective:**
Each button makes a (simulated) request. Each button's value determines the time in seconds each request takes to complete. Click the buttons and output the result of each request in the same order they were clicked. i.e:

```
 /**
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
```

## Exercise #4

**Objective:**
There are 3 message generators that post random messages on screen. A 4th source comes from the user input, like a chat room!. Find a way to log the 4 sources as they come in and post them to the screen. Avoid multiple subscriptions. i.e:

```
/**
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
```

## Exercise #5

**Objective:**
There are 3 source observables emitting at a random pace. When any of the sources emits, request a random number. Anytime a new number is generated, collect and sort all the numbers emitted at the time and log the collection of sorted items on screen. i.e:

```
/**
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
```

## Exercise #6

**Objective:**
Every second a counter emits a value incremented by 1. The updated value is displayed on screen. A restart button has been added to restart the counter everytime the button is clicked. Add the functionality required to make the restart button work as expected. i.e:

```
/**
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
```

## Exercise #7

**Objective:**
Complete the implementation of the login screen. Take into account that performing many requests at the same time can knock down the server a few seconds. Write a solution that prevents this behavior.

```
/**
 * Valid credentials:
 * username: admin
 * password: 1234
 */
```