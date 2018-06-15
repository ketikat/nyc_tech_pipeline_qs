// Question 1 -- sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".

const sortByStrings = (s, t) => {
  // converting s and t to lowercase
  const string = s.toLowerCase()
  const orderString = t.toLowerCase()
  const sHashMap = {}
  let result = ''

  // iterating through string and building hashmap
  for (let i = 0; i < s.length; i++) {
    if (sHashMap[string[i]]) {
      sHashMap[string[i]]++
    } else {
      sHashMap[string[i]] = 1
    }
  }

  // iterating through orderString
  for (let j = 0; j < orderString.length; j++) {
    if (sHashMap[orderString[j]]) {
      let count = sHashMap[orderString[j]]
      result += orderString[j].repeat(count)
    }
  }
  return result
}

// test cases:
console.log('sortByStrings("weather", "therapyw") ==>', sortByStrings('weather', 'therapyw'))
console.log('sortByStrings("good", "odg") ==>', sortByStrings('good', 'odg'))
