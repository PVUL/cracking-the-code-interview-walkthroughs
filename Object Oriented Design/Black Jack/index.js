const Suit = {
  Club: 0,
  Diamond: 1,
  Heart: 2,
  Spade: 3,
};

class Card {
  constructor(faceValue, suit) {
    // number or face that's on card - a number 2 through 10, or 11 for Jack, 12 for
    // Queen, 13 for King, or 1 for Ace
    this.faceValue = faceValue; // Will be number
    this.suit = suit;
    this.available = true;
  }
  value() {}
  isAvailable() {
    return this.available;
  }
  markUnavailable() {
    this.available = false;
  }
  markAvailable() {
    this.available = true;
  }
  print() {
    const faceValues = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    console.log(faceValues[this.faceValue - 1]);
    switch (this.suit) {
      case Suit.Club:
        console.log("c");
        break;
      case Suit.Heart:
        console.log("h");
        break;
      case Suit.Diamond:
        console.log("d");
        break;
      case Suit.Spade:
        console.log("s");
        break;
    }
    console.log(" ");
  }
}

class Deck {
  constructor() {
    this.cards = null; //All cards, dealt or not. Will be Array
    this.dealtIndex = 0; // marks first undealt card
  }
  setDeckOfCards(deckOfCards) {
    this.cards = deckOfCards;
  }
  shuffle() {
    this.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }
  remainingCards() {
    return this.cards.length - this.dealtIndex;
  }
  dealCard() {
    if (this.remainingCards() === 0) return null;

    const card = this.cards[this.dealtIndex];
    card.markUnavailable();
    this.dealtIndex++;
    return card;
  }
  dealHand(number) {
    if (this.remainingCards() < number) return null;

    const hand = [];
    let count = 0;
    while (count < number) {
      const card = this.dealCard();
      if (card) {
        hand[count] = card;
        count++;
      }
    }

    return hand;
  }
  print() {
    for (const card of this.cards) {
      card.print();
    }
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }
  score() {
    let score = 0;
    for (const card of this.cards) {
      score += card.value();
    }
    return score;
  }
  addCard(card) {
    this.cards.push(card);
  }
  discardHand() {
    this.cards = [];
  }
  print() {
    for (const card of this.cards) {
      card.print();
    }
  }
}

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

class BlackJackCard extends Card {
  constructor(faceValue, suit) {
    super(faceValue, suit);
  }
  value() {
    if (this.isAce()) {
      return 1;
    } else if (this.isFaceCard()) {
      // Face cards in BJ always worth 10.
      return 10;
    } else {
      // Number card
      return this.faceValue;
    }
  }
  minValue() {
    if (this.isAce()) return 1;
    else return this.value();
  }
  maxValue() {
    if (this.isAce()) return 11;
    else return this.value();
  }
  isAce() {
    return this.faceValue === 1;
  }
  isFaceCard() {
    return this.faceValue >= 11 && this.faceValue <= 13;
  }
}

class BlackJackHand extends Hand {
  constructor() {
    super();
  }
  // There are multiple possible scores for a blackjack hand, since aces have
  // multiple values. Return the highest possible score that's under 21, or the
  // lowest score that's over.
  score() {
    const scores = this.possibleScores();
    let maxUnder = Number.NEGATIVE_INFINITY;
    let minOver = Number.POSITIVE_INFINITY;
    for (const score of scores) {
      if (score > 21 && score < minOver) {
        minOver = score;
      } else if (score <= 21 && score > maxUnder) {
        maxUnder = score;
      }
    }
    return maxUnder == Number.NEGATIVE_INFINITY ? minOver : maxUnder;
  }
  // return a list of all possible scores this hand could have (evaluating each
  // ace as both 1 and 11
  possibleScores() {
    const scores = [];
    if (this.cards.length === 0) {
      return scores;
    }
    for (const card of this.cards) {
      this.addCardToScoreList(card, scores);
    }
    return scores;
  }
  addCardToScoreList(card, scores) {
    if (scores.length == 0) {
      scores.push(0);
    }
    const length = scores.length;
    for (let i = 0; i < length; i++) {
      const score = scores[i];
      scores[i] = score + card.minValue();
      if (card.minValue() !== card.maxValue()) {
        scores.push(score + card.maxValue());
      }
    }
  }
  busted() {
    return this.score() > 21;
  }
  is21() {
    return this.score() === 21;
  }
  isBlackJack() {
    if (this.cards.length !== 2) {
      return false;
    }
    const first = this.cards[0];
    const second = this.cards[1];
    return (
      (first.isAce() && second.isFaceCard()) ||
      (second.isAce() && first.isFaceCard())
    );
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Class Deck", () => {
  it("dealCard removes AND returns card from deck", () => {
    const oneOfClubs = new Card(1, 0);
    const twoOfClubs = new Card(2, 0);
    const threeOfClubs = new Card(2, 0);
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    const dealtCards = [];
    dealtCards.push(d.dealCard());
    dealtCards.push(d.dealCard());
    dealtCards.push(d.dealCard());

    assert.equal(dealtCards.includes(oneOfClubs), true);
    assert.equal(dealtCards.includes(twoOfClubs), true);
    assert.equal(dealtCards.includes(threeOfClubs), true);
  });
  it("dealCard returns falsy value if deck is empty", () => {
    const oneOfClubs = new Card(1, 0);
    const deckOfCards = [oneOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    const dealtCards = [];
    dealtCards.push(d.dealCard());
    assert.equal(!!d.dealCard(), false);
  });
  it("dealHand returns falsy value if not enough cards in deck", () => {
    const oneOfClubs = new Card(1, 0);
    const twoOfClubs = new Card(2, 0);
    const threeOfClubs = new Card(2, 0);
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    assert.equal(!!d.dealHand(4), false);
  });
  it("dealHand returns array of cards of specified length", () => {
    const oneOfClubs = new Card(1, 0);
    const twoOfClubs = new Card(2, 0);
    const threeOfClubs = new Card(2, 0);
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    const hand = d.dealHand(3);

    assert.equal(hand.length, 3);
    assert.equal(hand.includes(oneOfClubs), true);
    assert.equal(hand.includes(twoOfClubs), true);
    assert.equal(hand.includes(threeOfClubs), true);
  });
});

describe("BlackJackHand", () => {
  it("score() correctly values aces as 1 or 11s", () => {
    const queenOfClubs = new BlackJackCard(12, 0);
    const aceOfClubs = new BlackJackCard(1, 0);

    const bjh = new BlackJackHand();

    bjh.addCard(queenOfClubs);
    assert.equal(bjh.score(), 10);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.score(), 21);

    bjh.discardHand();

    bjh.addCard(queenOfClubs);
    bjh.addCard(queenOfClubs);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.score(), 21);
  });
  it("isBlackJack() correctly states if it is black jack (a count of 21 in two cards)", () => {
    const queenOfClubs = new BlackJackCard(12, 0);
    const aceOfClubs = new BlackJackCard(1, 0);

    const bjh = new BlackJackHand();

    bjh.addCard(queenOfClubs);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.isBlackJack(), true);

    bjh.addCard(queenOfClubs);
    assert.equal(bjh.isBlackJack(), false);
  });
});

mocha.run();
