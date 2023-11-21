function getRandomNumber() {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomFraction = Math.random();
    // Scale the random fraction to the desired range (1 to 99)
    const randomNumber = Math.floor(randomFraction * 99) + 1;

    return randomNumber;
}

export default getRandomNumber;