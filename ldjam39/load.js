///////////////////////////////////////////
//   Cyclades Travelling Sailor
///////////////////////////////////////////
// author: rightangel
// for LDJAM39 COMPO
///////////////////////////////////////////

var fontsReady = false;

var loadState = {

	loadingLabel: null,
	introSpr: null,

	preload: function()
	{
		game.load.image('intro', './images/intro.jpg');
		game.load.image('end', './images/end.jpg');
		game.load.image('map01', './images/map01.png');
		game.load.image('map02', './images/map02.png');
		game.load.image('map03', './images/map03.png');
		game.load.spritesheet('shipSpsh', './images/shipSpsh.png', 160, 160, 36);
		game.load.spritesheet('lighthouseSpsh', './images/lighthouseSpsh.png', 100, 100, 5);
		game.load.spritesheet('ballSpsh', './images/ballSpsh.png', 160, 160, 10);
		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},

	create: function()
	{
		game.stage.backgroundColor = "#000088";
		this.introSpr = game.add.sprite(0,0, 'intro');
		this.introSpr.anchor.set(0);

		loadingLabel = game.add.text(600, 500, 'click to play');
		loadingLabel.fontSize = 20;
		loadingLabel.fill = '#ffffff';

		mainLabel = game.add.text(100, 200, 'Cyclades \nTravelling \nSailor');
		mainLabel.fontSize = 80;
		mainLabel.fill = '#ffffff';

		game.input.onDown.add(this.clicked) ;
	},


	clicked: function()
	{
		if( fontsReady)
			game.state.start('playState');
	},

	googleFontsReady: function()
	{
		 	fontsReady = true;
			loadingLabel.font = 'Caesar Dressing';
			mainLabel.font = 'Caesar Dressing';
	}
}

WebFontConfig = 
{
    active: loadState.googleFontsReady,
    google: 
	{
      families: ['Caesar Dressing']
    }
};
