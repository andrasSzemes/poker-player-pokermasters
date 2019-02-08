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


    if (holeCards[0].rank === holeCards[1].rank && highCardsInHand) {
      //all in for pair and high cards
      bet(my_stack)
    } else if (holeCards[0].rank === holeCards[1].rank) {
      let betToPut = gameState.minimum_raise + 100 < my_player.stack ? gameState.minimum_raise + 100 : my_player.stack;
      console.log(betToPut);
      bet(my_stack)
    } else if (highCardsInHand) {
      //console.log('all in for highCards');
      let betToPut = gameState.minimum_raise + 100 < my_player.stack ? gameState.minimum_raise + 100 : my_player.stack;
      console.log(betToPut);
      bet(my_stack)
    } else {
      //console.log('Fold in');
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
