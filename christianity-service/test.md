function generateUniqueRandomNumberString() {
const generatedNumbers = new Set();

while (generatedNumbers.size < 9) {
// Generate a random 9-digit number
const randomNumber = Math.floor(Math.random() \* 1000000000);

    // Convert the random number to a string
    const numberString = randomNumber.toString();

    // Add the number string to the set
    generatedNumbers.add(numberString);

}

// Convert the set of number strings to an array
const uniqueNumberStrings = Array.from(generatedNumbers);

// Randomly select one of the unique number strings
const randomIndex = Math.floor(Math.random() \* uniqueNumberStrings.length);
const randomUniqueNumberString = uniqueNumberStrings[randomIndex];

console.log(randomUniqueNumberString)
return randomUniqueNumberString;
}

generateUniqueRandomNumberString()
