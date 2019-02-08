class Player {
  static get VERSION() {
    return '1.0';
  }

  static betRequest(gameState, bet) {
    let json = JSON.parse(gameState);

    let holeCards = [];
    for (const player of json.players) {
      if (player.name === 'PokerMasters') {
        holeCards = player.hole_cards
      }
    }

    if (holeCards[0].rank === holeCards[1].rank) {
      bet(50)
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
