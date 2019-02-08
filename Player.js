class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {

    let my_player ='';
    for (const player of gameState.players) {
      if (player.name === 'PokerMasters') {
        my_player = player;
        console.log(player.status);
      }
    }

    let holeCards = my_player.hole_cards;
    let allIn = my_player.stack;
    let rankOne = holeCards[0].rank;
    let rankTwo = holeCards[1].rank;
    let suitOne = holeCards[0].suit;
    let suitTwo = holeCards[1].suit;
    let highCards = ['J', 'Q', 'K', 'A'];
    let highCardsInHand = highCards.includes(rankOne) && highCards.includes(rankTwo);
    let highCardInHand = highCards.includes(rankOne) || highCards.includes(rankTwo);
    let comCards = gameState.community_cards;
    let isPairInHand = rankOne === rankTwo;
    let isSameSuitInHand = suitOne === suitTwo;
    let minRaise = gameState.minimum_raise;


    if ((isPairInHand && highCardsInHand) || highCardsInHand) {
      bet(allIn)
    } else if (isPairInHand) {
      let betToPut = minRaise + 100 < my_player.stack ? minRaise + 100 : allIn;
      bet(betToPut)
    } else if( isSameSuitInHand && highCardInHand) {
        if(comCards.length === 0) {
          bet(minRaise);
        } else if(comCards.length >= 3) {
          let suitCounter = 2;
          for (let i = 0; i < comCards.length; i++) {
            if(comCards[i].suit === suitOne) {
              suitCounter += 1;
            }
          }
          if(suitCounter >= 4) {
            bet(allIn)
          } else{
            for (let i = 0; i < comCards.length; i++) {
              if(comCards[i].rank === rankOne || comCards[i].rank === rankTwo) {
                if (highCards.includes(comCards[i].rank)) {
                  bet(allIn)
                } else {
                  bet(minRaise);
                }
              }
            }
            bet(0);
          }
        }
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
