class Player {
  static get VERSION() {
    return '1.1';
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
    let rankOne = holeCards[0].rank;
    let rankTwo = holeCards[1].rank;
    let suitOne = holeCards[0].suit;
    let suitTwo = holeCards[1].suit;
    let middleRankCards = ['9', '10'];
    let highCards = ['J', 'Q', 'K', 'A'];
    let highCardsInHand = highCards.includes(rankOne) && highCards.includes(rankTwo);
    let middleCardsInHand = middleRankCards.includes(rankOne) && middleRankCards.includes(rankTwo);
    let highCardInHand = highCards.includes(rankOne) || highCards.includes(rankTwo);
    let comCards = gameState.community_cards;
    let isPairInHand = rankOne === rankTwo;
    let isSameSuitInHand = suitOne === suitTwo;
    let minRaise = gameState.minimum_raise;


    if (isPairInHand && highCardsInHand) {
      bet(my_player.stack);
    } else if(highCardsInHand) {
      let halfStack = Math.round(my_player.stack / 2);
      bet(halfStack);
    } else if (isPairInHand) {
      let halfStack = Math.round(my_player.stack / 2);
      if(middleCardsInHand) {
        bet(halfStack)
      } else {
        bet(minRaise + 100)
      }
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
            bet(my_player.stack);
          } else{
            for (let i = 0; i < comCards.length; i++) {
              if(comCards[i].rank === rankOne || comCards[i].rank === rankTwo) {
                if (highCards.includes(comCards[i].rank)) {
                  bet(my_player.stack);
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
