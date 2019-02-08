class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {

    let holeCards = [];
    let my_stack = '';
    let my_player ='';
    for (const player of gameState.players) {
      if (player.name === 'PokerMasters') {
        my_player = player;
        holeCards = player.hole_cards;
        //console.log('my cards');
        //console.log(holeCards);
        //console.log('my stack: ' + player.stack);
        my_stack = player.stack;
        console.log(player.status);
      }
    }

    let highCards = ['J', 'Q', 'K', 'A'];
    let highCardsInHand = highCards.includes(holeCards[0].rank) && highCards.includes(holeCards[1].rank);
    let highCardInHand = highCards.includes(holeCards[0].rank) || highCards.includes(holeCards[1].rank);
    let comCards = gameState.community_cards;



    if ((holeCards[0].rank === holeCards[1].rank && highCardsInHand) || highCardsInHand) {
      //all in for pair and high cards
      bet(my_stack)
    } else if (holeCards[0].rank === holeCards[1].rank) {
      let betToPut = gameState.minimum_raise + 100 < my_player.stack ? gameState.minimum_raise + 100 : my_player.stack;
      bet(betToPut)
    } else if(holeCards[0].suit === holeCards[1].suit && highCardInHand) {
        if(comCards.length === 0) {
          bet(gameState.minimum_raise);
        } else if(comCards.length >= 3) {
          let suitCounter = 2;
          for (let i = 0; i < comCards.length; i++) {
            if(comCards[i].suit === holeCards[0].suit) {
              suitCounter += 1;
            }
          }
          if(suitCounter >= 4) {
            bet(my_stack)
          } else{
            for (let i = 0; i < comCards.length; i++) {
              if(comCards[i].rank === holeCards[0].rank || comCards[i].rank === holeCards[1].rank) {
                bet(my_stack)
              }
            }
            bet(0);
          }
        }
    } else {
      //console.log('Fold in');
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
