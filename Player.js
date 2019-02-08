class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {

    let holeCards = [];
    let my_stack = '';
    for (const player of gameState.players) {
      if (player.name === 'PokerMasters') {
        holeCards = player.hole_cards;
        //console.log('my cards');
        //console.log(holeCards);
        //console.log('my stack: ' + player.stack);
        my_stack = player.stack
      }
    }

    let highCards = ['10', 'J', 'Q', 'K', 'A'];
    let highCardsInHand = highCards.includes(holeCards[0].rank) && highCards.includes(holeCards[1].rank);


    if (holeCards[0].rank === holeCards[1].rank && highCardsInHand) {
      //all in for pair and high cards
      bet(my_stack)
    } else if (holeCards[0].rank === holeCards[1].rank) {
      let betToPut = gameState.minimum_raise + 100 < player.stack ? gameState.minimum_raise + 100 : player.stack;
      bet(betToPut)
    } else if (highCardsInHand) {
      //console.log('all in for highCards');
      let betToPut = gameState.minimum_raise + 100 < player.stack ? gameState.minimum_raise + 100 : player.stack;
      bet(betToPut)
    } else {
      //console.log('Fold in');
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
