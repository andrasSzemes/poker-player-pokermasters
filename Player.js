class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {
    console.log(gameState);
    console.log(bet);

    let holeCards = [];
    for (const player of gameState.players) {
      if (player.name === 'PokerMasters') {
        holeCards = player.hole_cards;
        console.log(player);
      }
    }

    if (holeCards[0].rank === holeCards[1].rank) {
      bet(gameState.minimum_raise)
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
