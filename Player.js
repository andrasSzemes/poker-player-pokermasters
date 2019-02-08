class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {

    let holeCards = [];
    for (const player of gameState.players) {
      if (player.name === 'PokerMasters') {
        holeCards = player.hole_cards;
        console.log(holeCards);
      }
    }

    if (holeCards[0].rank === holeCards[1].rank) {
      console.log('minimum_raise given in: ' + gameState.minimum_raise);
      bet(gameState.minimum_raise)
    } else {
      console.log('Fold in');
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
