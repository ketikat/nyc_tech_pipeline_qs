// Question 2 -- decodeString(s): Given an encoded string, return its corresponding decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. Note: k is guaranteed to be a positive integer.

// For s = "4[ab]", the output should be decodeString(s) = "abababab"
// For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"

// the solution below works for all inputs that are formatted correctly. If I had more time i would like to check for formatting errors.
const decodeString = str => {
  // initializing result
  let result = ''
  // 2 stacks
  let storedStrings = []
  let multipliers = []

  // non-recursive approach:
  // loop through each character in the string, adding to our stacks so that order of events is preserved.
  for (let i = 0; i < str.length; i++) {
    let current = str[i]

    // _______________________________________________
    // if current character is a number:
    // I'm sure there's a better way to check if the current character is a number. This check worked, but in the future, I would probably do something more robust.
    if (current >= 0) {
      // beacuse we have now run into a number, we know that whatever value we have saved in 'result' is finished being built. So we can push that stored value into the storedStrings stack, and re-set the value of 'result'. Even if 'result' is an empty string,  we still push it onto the stack, in order to preserve the order of operations later on when we pop off the stacks. If the string is empty, nothing will happen.
      storedStrings.push(result)
      result = ''

      // we know that the current character is a number, but it may be a multi digit number...
      let multiplier = ''
      // checks to see if next character is also a number, and if it is, we are incerementing our index 'i' by 1.
      while (str[i] >= 0) {
        multiplier = multiplier + str[i]
        i++
      }
      // when we are done with finding all the numbers in this sequence, we can pop the final num onto the stack.
      multipliers.push(+multiplier)
    } else if (!(current === ']')) {
      // _______________________________________________
      // if current character is a letter:
      // this stores any non-number and non-closing bracket value into our result
      result += current
    } else if (current === ']') {
      // _______________________________________________
      // if current character is a closing bracket:
      // once we hit a closing bracket, we know we have to look at multipliers stack and pop off the last item. We also have to pop the last item of off the storedStrings stack.
      let currentMultiplier = multipliers.pop()
      let previousString = storedStrings.pop()
      result = previousString + result.repeat(currentMultiplier)
    }
  }
  return result
}

// test cases
console.log(decodeString('3[*2[cat]1[DOG]/]'))
console.log(decodeString('2[ab]'))
console.log(decodeString('2[b3[a]]'))
