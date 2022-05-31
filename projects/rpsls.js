const readline = require('readline-sync');

function createPlayer() {
  return {
    score: 0,
    move: null,
    moveHistory: {},
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose 1) rock, 2) paper, 3) scissors, 4) lizard or 5) spock');
        choice = readline.question().toLowerCase();
        switch (choice) {
          case '1':
          case 'r':
            choice = 'rock';
            break;
          case '2':
          case 'p':
            choice = 'paper';
            break;
          case '3':
            choice = 'scissors';
            break;
          case '4':
          case 'l':
            choice = 'lizard';
            break;
          case '5':
            choice = 'spock';
            break;
          case 's':
            console.log('please choose between 1) scissors and 2) spock');
            while (true) {
              choice = readline.question().toLowerCase();
              if (['1', '2', 'scissors', 'spock'].includes(choice)) break;
              console.log('Sorry, invalid choice');
            }
            if (choice === '1') {
              choice = 'scissors';
            } else choice = 'spock';
        }
        if (RPSGame.moves.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = RPSGame.moves;
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}


const RPSGame = {
  moves: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  winningScore: null,
  grandWinner: null,
  gameMode: null,
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!\n');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!\n');
  },

  displayScores() {
    if (this.gameMode === 'multiple') console.log(`Your Score: ${this.human.score} Computer Score: ${this.computer.score}\n`);
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    console.clear();

    this.displayScores();

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\n`);

    if (this.checkUserWins(humanMove, computerMove)) {
      this.human.score++;
      if (this.human.score !== this.winningScore) console.log('You won the round!\n');
    } else if (humanMove === computerMove) {
      console.log("It's a tie");
    } else {
      this.computer.score++;
      if (this.computer.score !== this.winningScore) console.log('Computer won the round!\n');
    }
  },

  checkUserWins(humanMove, computerMove) {
    return (humanMove === 'rock' && computerMove === 'scissors') ||
           (humanMove === 'rock' && computerMove === 'lizard') ||
           (humanMove === 'paper' && computerMove === 'rock') ||
           (humanMove === 'paper' && computerMove === 'spock') ||
           (humanMove === 'scissors' && computerMove === 'paper') ||
           (humanMove === 'scissors' && computerMove === 'lizard') ||
           (humanMove === 'lizard' && computerMove === 'paper') ||
           (humanMove === 'lizard' && computerMove === 'spock') ||
           (humanMove === 'spock' && computerMove === 'scissors') ||
           (humanMove === 'spock' && computerMove === 'rock');
  },

  continueGame() {
    console.log('Keep Playing? (y/n)');
    let answer = readline.question().toLowerCase();
    while (true) {
      if (['y', 'yes', 'n', 'no'].includes(answer)) break;
      console.log('Sorry, invalid choice.');
      answer = readline.question().toLowerCase();
    }
    return answer[0] === 'y';
  },

  restartGame() {
    this.resetScores();
    console.log('Restart Game? (y/n)');
    let answer = readline.question().toLowerCase();
    while (true) {
      if (['y', 'yes', 'n', 'no'].includes(answer)) break;
      console.log('Sorry, invalid choice.');
      answer = readline.question().toLowerCase();
    }
    return answer[0] === 'y';
  },

  resetScores() {
    this.grandWinner = 0;
    this.computer.score = 0;
    this.human.score = 0;
  },

  displayGrandWinner() {
    if (this.human.score === this.winningScore) {
      this.grandWinner = 'human';
      console.log(`You are the Grand Winner!\n`);
      this.displayScores();
    } else if (this.computer.score === this.winningScore) {
      this.grandWinner = 'computer';
      console.log(`Computer is the Grand Winner!\n`);
      this.displayScores();
    }
  },

  chooseGameMode() {
    console.log('Game Mode: 1) Single round or 2) Multiple rounds');
    let answer = readline.question().toLowerCase();

    while (true) {
      if (['1', 's'].includes(answer)) {
        answer = 'single';
      } else if (['2', 'm'].includes(answer)) {
        answer = 'multiple';
      }
      if (['single', 'multiple'].includes(answer)) break;
      console.log('Sorry, invalid choice.');
      answer = readline.question().toLowerCase();
    }

    this.gameMode = answer;

    this.askWinningScore();
  },

  askWinningScore() {
    if (this.gameMode === 'multiple') {
      console.clear();
      console.log('Choose a winning score! eg. \'5\'');
      let winningScore = readline.question();
      while (true) {
        if (!isNaN(Number(winningScore))) break;
        console.log('Sorry, invalid input.');
        winningScore = readline.question();
      }
      this.winningScore = Number(winningScore);
    } else if (this.gameMode === 'single') {
      this.winningScore = 1;
    }
  },

  addMoveHistory() {
    let humanMoveHistory = this.human.moveHistory;
    let computerMoveHistory = this.computer.moveHistory;
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMoveHistory.hasOwnProperty(humanMove)) {
      humanMoveHistory[humanMove] += 1;
    } else humanMoveHistory[humanMove] = 1;

    if (computerMoveHistory.hasOwnProperty(computerMove)) {
      computerMoveHistory[computerMove] += 1;
    } else computerMoveHistory[computerMove] = 1;
  },

  play() {
    this.displayWelcomeMessage();
    this.chooseGameMode();

    while (true) {
      while (true) {
        console.clear();
        this.displayScores();
        this.human.choose();
        this.computer.choose();
        this.addMoveHistory();
        this.displayWinner();
        this.displayGrandWinner();
        if (this.grandWinner !== null) break;
        if (!this.continueGame()) break;
      }

      if (!this.restartGame()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
