const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

class CryptoQuestArcade {
  constructor() {
    this.jokes = [
      "What's a Bitcoin's favorite snack? Microchips!",
      "How do you make a small fortune in crypto? Start with a large fortune.",
      "Why did the Ethereum investor go to therapy? To deal with his smart contract issues."
    ];
    this.quizQuestions = [
      { question: "Who created Bitcoin?", options: ["Satoshi Nakamoto", "Elon Musk", "Vitalik Buterin"], answer: 0 },
      { question: "What does 'HODL' stand for?", options: ["Hold On for Dear Life", "Hold On; Don’t Leave", "A misspelling of 'hold'"], answer: 2 }
    ];
    this.portfolio = { btc: 0, eth: 0 };
    this.prices = { btc: 0, eth: 0 };
  }

  async fetchCryptoPrices() {
    try {
      const { data: btcData } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const { data: ethData } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      this.prices.btc = btcData.bitcoin.usd;
      this.prices.eth = ethData.ethereum.usd;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  tellJoke() {
    console.log(this.jokes[Math.floor(Math.random() * this.jokes.length)]);
  }

  takeQuiz() {
    const question = this.quizQuestions[Math.floor(Math.random() * this.quizQuestions.length)];
    console.log(question.question);
    question.options.forEach((option, index) => {
      console.log(`${index}: ${option}`);
    });
    readline.question("Your answer (number): ", answer => {
      if (parseInt(answer) === question.answer) {
        console.log("Correct!");
      } else {
        console.log("Wrong! Better luck next time.");
      }
      readline.close();
    });
  }

  tradeSimulation() {
    console.log("Current prices: BTC: $" + this.prices.btc + ", ETH: $" + this.prices.eth);
    readline.question("Which currency to buy? (BTC/ETH): ", async currency => {
      const amount = currency.toLowerCase() === 'btc' ? 0.01 : 0.1;
      console.log(`Bought ${amount} ${currency.toUpperCase()} at $${this.prices[currency.toLowerCase()]}`);
      this.portfolio[currency.toLowerCase()] += amount;
      readline.close();
    });
  }

  start() {
    console.log("Welcome to CryptoQuestArcade!");
    readline.question("Choose an activity: joke, quiz, trade: ", choice => {
      switch (choice) {
        case 'joke':
          this.tellJoke();
          break;
        case 'quiz':
          this.takeQuiz();
          break;
        case 'trade':
          this.tradeSimulation();
          break;
        default:
          console.log("Invalid choice. Please choose again.");
          readline.close();
      }
    });
  }
}

const game = new CryptoQuestArcade();
game.start();
