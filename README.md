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
