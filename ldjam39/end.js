///////////////////////////////////////////
//   Cyclades Travelling Sailor
///////////////////////////////////////////
// author: rightangel
// for LDJAM39 COMPO
///////////////////////////////////////////

var endState = {
	create: function(){
		game.stage.backgroundColor = "#000088";
		game.stage.backgroundColor = "#440000";
		var introSpr = game.add.sprite(0,0, 'end');
		introSpr.anchor.set(0);

		var gameoverLabel = game.add.text(100, 200, 'The end');
		gameoverLabel.font = 'Caesar Dressing';
		gameoverLabel.fontSize = 80;
		gameoverLabel.fill = '#ffffff';

		var gameoverLabel = game.add.text(600, 500, 'Well done sailor!');
		gameoverLabel.font = 'Caesar Dressing';
		gameoverLabel.fontSize = 20;
		gameoverLabel.fill = '#ffffff';
	},
}
