// Question 3 -- changePossibilities(amount,amount): Your quirky boss collects rare, old coins. They found out you're a programmer and asked you to solve something they've been wondering for a long time.

// Write a function that, given an amount of money and an array of coin denominations, computes the number of ways to make the amount of money with coins of the available denominations.

// Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 4¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢

// I realize this approach is not optimal, but it is my first apprach to the problem, and I think it was a neccessary step to arriving at the more optimized solution.
// The reason this is not an optimal solution is because of the recursion, this function is making some of the same calls multiple times. One way to solve this would be to construct an object that has the result of each unique call stored in it. So, instead of re-assesing certain calls, we could look them up on the object. The downside to this is ofcourse more space complexity to store the lookup object.
const changePossibilities = (total, denominations) => {
  // 3 different base cases
  // ----------------------------------------------------
  // if the coin we just chose subtracted from the total equals 0, then we return 1 (meaning we were able to use the 1 coin we were looking at)
  if (total === 0) return 1

  // if the chosen coin was too big
  if (total < 0) return 0

  // if there are no more denominations of coins to check
  if (!denominations.length) return 0

  // recursion:
  // --------------------------------------------------
  else {
    // totalNumOfWays is intitialized to 0 everytime.
    let totalNumOfWays = 0

    // current coin will always be coin at index 0 of denominations array.
    let currentCoin = denominations[0]

    while (total >= 0) {
      // when we are calling the function recursively, we need to make sure to pass a shirtened version of the denominations array. Creating a new demoninations array everytime is costly in terms of space complexity.
      totalNumOfWays += changePossibilities(total, denominations.slice(1))
      total -= currentCoin
    }
    return totalNumOfWays
  }
}

// I used this a resource for creating my memoized function:
// https://medium.freecodecamp.org/understanding-memoize-in-javascript-51d07d19430e
const higherOrderMemo = func => {
  // initialize history object to keep track of calls made
  const history = {}

  // returning an anonymous function that takes arguments using the rest parameter syntax
  return (...argsList) => {
    // console.log(argsList)
    // if the args are found in the history object, then we don't need to call the function>
    // We can just lookup the value directly from the history object.
    if (history[argsList]) {
      return history[argsList]
    }
    // if the args are not in the history, then we should call the function and save the result in the history.
    const result = func(...argsList)
    history[argsList] = result
    return result
  }
}

// P.S.
// I realize that I could have gone further with this and developed an entirely different approach that would be even more optimized. However, I think the way that I solved it is more readable than a highly optimal approach. Sometimes, I prefer readability over pure efficiency :0 Thanks!

// creating memoized changePossibilities function
const optimizedChangePossibilites = higherOrderMemo(changePossibilities)
// test cases
console.log(optimizedChangePossibilites(4, [1, 2, 3]))
console.log(optimizedChangePossibilites(6, [1, 2, 3]))
console.log(optimizedChangePossibilites(10, [1, 2, 3, 4]))
