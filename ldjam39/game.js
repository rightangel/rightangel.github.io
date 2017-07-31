///////////////////////////////////////////
//   Cyclades Travelling Sailor
///////////////////////////////////////////
// author: rightangel
// for LDJAM39 COMPO
///////////////////////////////////////////

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('playState', playState);
game.state.add('loadState', loadState);
game.state.add('endState', endState);

game.state.start('loadState');
