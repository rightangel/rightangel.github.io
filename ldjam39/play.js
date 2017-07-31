///////////////////////////////////////////
//   Cyclades Travelling Sailor
///////////////////////////////////////////
// author: rightangel
// for LDJAM39 COMPO
///////////////////////////////////////////

var signalClick = false;
var clickPosition = [];

var playState =
{
	shipSpr: null,
	backgroundSpr: null,
	lighthouseSpr: null,
	level: 0,
	targetBall:0,
	travelling: false,
	targetLightHouse:false,
	power: 0,
	nextLevel: false,
	powerPercentage: 0,

	powerAvailable:
	[11479, 23438, 27441, 24617, 29061, 30278, 35015],

	startShipPositions:
	[
		[600,506],
		[680,506],
		[722, 37],
		[ 42,170],
		[ 27,177],
		[727,165],
		[600,506]
	],

	ballPositions :
	[
		[[223,325]],
		[[696,344],[618,213],[480,188],[391,133],[211,174],[527,310]],
		[[190,187],[195,319],[339,400],[377,253],[553,357],[542, 82],[642,199]],
		[[203,406],[321,415],[589, 98],[369,118],[173,207],[369,307]],
		[[ 43,358],[272,421],[689,144],[547,344],[347,312],[447,167],[693,289]],
		[[387,182],[422,395],[148,364],[ 55,262],[263,268],[723,322],[589,126],[184,243]],
		[[696,344],[618,213],[480,188],[391,133],[211,174],[527,310],[320,299],[354,493],[152,331],[442,543]]
	],

	ballSprites: [],

	ballVisited: [],

	lightHousePositions:
	[
		[211,174],
		[253,435],
		[210,480],
		[593,337],
		[308,195],
		[552,388],
		[253,435]
	],

	update: function(){
		if( signalClick )
		{
			this.handleClick( clickPosition.x, clickPosition.y);
			signalClick = false;
		}

		if(this.travelling)
		{
			var dx,dy,ds,vel;
			if(this.targetLightHouse === true)
			{
				dx = this.lighthouseSpr.position.x - this.shipSpr.x;
				dy = this.lighthouseSpr.position.y - this.shipSpr.y;
				ds = Math.sqrt(dx*dx+dy*dy);
				vel = 2;
				if( ds < 2*vel )
				{
					this.travelling = false;
					this.nextLevel = true;
				}
			}
			else
			{
				dx = this.ballSprites[this.targetBall].position.x - this.shipSpr.x;
				dy = this.ballSprites[this.targetBall].position.y - this.shipSpr.y;
				ds = Math.sqrt(dx*dx+dy*dy);
				vel = 2;

				if( ds < 2*vel )
				{
					this.travelling = false;
					this.ballVisited[this.targetBall] = true;
					this.ballSprites[this.targetBall].position.x = -500;
					this.ballSprites[this.targetBall].position.y = -500;
				}
			}

			this.shipSpr.x += vel * dx/ds;
			this.shipSpr.y += vel * dy/ds;

			var phi = Math.atan2(-dy,dx) * 180 / Math.PI;

			if( phi < 0 )
				phi += 360;
			phi = phi / 10;
			phi = Math.round(phi);

			//this.shipSpr.frame = phi;
			var sf = this.shipSpr.frame;
			var diff = phi - this.shipSpr.frame;
			if (diff < 0)
				diff += 36;
			if( diff > 18 )
				sf--;
			else if( diff > 0 )
				sf++;
			if( sf > 35 )
				sf -= 36;
			if( sf < 0 )
				sf += 36;
			this.shipSpr.frame = sf;

		}
	},

	create: function(){
			game.stage.backgroundColor = "#00FF00";

			this.backgroundSpr = game.add.sprite(0,0, 'map01');
			this.backgroundSpr.anchor.set(0);

			this.lighthouseSpr = game.add.sprite( 0, 0, 'lighthouseSpsh');
			this.lighthouseSpr.anchor.set(0.5);
			this.lighthouseSpr.animations.add('blink');
			this.lighthouseSpr.animations.play('blink', 4, true);

			for (var i = 0; i < 20; i++)
			{
				this.ballSprites[i] = game.add.sprite( -500, -500,'ballSpsh');
				this.ballSprites[i].anchor.set(0.5);
				this.ballSprites[i].animations.add('jump',[2,3,4,5,6,7,8,9,0,1]);
			}

			powerLabel = game.add.text(10, 10, 'level 1');
			powerLabel.fontSize = 60;
			powerLabel.fill = '#ffffff';
			powerLabel.font = 'Caesar Dressing';

			this.shipSpr = game.add.sprite( 100, 100, 'shipSpsh');
			this.shipSpr.anchor.set(0.5);
			game.input.onDown.add(this.clicked) ;
			this.changeLevel(true);
	},

	changeLevel: function( start )
	{
		if( this.powerPercentage >= 0)
		{
			this.nextLevel = false;
			if( start)
			{
				this.level = 0;
				powerLabel.text = "Level 1 - Good luck!";
			}
			else
			{
				if( this.level == 6)
				{
					game.state.start('endState');
					return;
				}
				this.level++;
				powerLabel.text = "Next level - Level "+(1+this.level);
			}
		}
		else
		{
			this.nextLevel = false;
			powerLabel.text = "One more time - Level "+(1+this.level);
		}

		this.power = 0;

		this.putLightHouses();
		this.targetLightHouse = false;
		game.world.bringToTop(this.shipSpr);

		switch( this.level )
		{
			case 0:
			case 1:
			case 6:
				this.backgroundSpr.loadTexture('map01');
				break;
			case 2:
			case 3:
				this.backgroundSpr.loadTexture('map02');
				break;
			default:
				this.backgroundSpr.loadTexture('map03');
		}
	},

	clicked: function(pointer)
	{
		signalClick = true;
		clickPosition.x = pointer.position.x;
		clickPosition.y = pointer.position.y;
	},

	handleClick:function(x,y)
	{
		if(this.travelling == false)
		{
			if( this.nextLevel )
			{
				this.changeLevel(false);
				return;
			}

			var dist = 0;
			for (var i = 0; i < 20; i++)
			{
				dist = 0;
				if(  i < this.ballPositions[this.level].length )
				{
					dist += Math.abs( x - this.ballSprites[i].position.x);
					dist += Math.abs( y - this.ballSprites[i].position.y);
					if( dist < 50 )
					{
						this.targetBall = i;
						this.focusOnLightHouse(i);
						this.travelling = true;
						var travelDistance = Math.sqrt(
							(this.ballSprites[i].position.x - this.shipSpr.x)*
							(this.ballSprites[i].position.x - this.shipSpr.x)+
							(this.ballSprites[i].position.y - this.shipSpr.y)*
							(this.ballSprites[i].position.y - this.shipSpr.y)
						);
						this.power += travelDistance * 20;
						this.powerPercentage = Math.round(100*
							(this.powerAvailable[this.level] - this.power)/
							this.powerAvailable[this.level]);
						if( this.powerPercentage >= 0 )
							powerLabel.text = "Power left:"+this.powerPercentage+"%";
						else
							powerLabel.text = "Out of Power:"+this.powerPercentage+"%";
					}
				}
			}
			dist = 0;
			if( this.ballCount() == 0)
			{
				dist += Math.abs( x - this.lighthouseSpr.position.x);
 				dist += Math.abs( y - this.lighthouseSpr.position.y);
				if( dist < 50 )
				{
					this.targetLightHouse = true;
					this.travelling = true;
					var travelDistance = Math.sqrt(
						(this.lighthouseSpr.position.x - this.shipSpr.x)*
						(this.lighthouseSpr.position.x - this.shipSpr.x)+
						(this.lighthouseSpr.position.y - this.shipSpr.y)*
						(this.lighthouseSpr.position.y - this.shipSpr.y)
					);
					this.power += travelDistance * 20;
					this.powerPercentage = Math.round(100*
						(this.powerAvailable[this.level] - this.power)/
						this.powerAvailable[this.level]);
						if( this.powerPercentage >= 0 )
							powerLabel.text = "Power left:"+this.powerPercentage+"%";
						else
							powerLabel.text = "Out of Power:"+this.powerPercentage+"%";
				}
			}
		}
	},

	ballCount:function()
	{
		var c = 0;
		for (var i = 0; i < 20; i++)
			if(  i < this.ballPositions[this.level].length )
				if( this.ballVisited[i] == false)
					c++;
		return c;
	},

	putLightHouses: function()
	{
		for (var i = 0; i < 20; i++)
		{
			this.ballSprites[i].frame = 1;
			this.ballVisited[i] = false;
			if(  i < this.ballPositions[this.level].length )
			{
				this.ballSprites[i].position.x = this.ballPositions[this.level][i][0];
				this.ballSprites[i].position.y = this.ballPositions[this.level][i][1];
			}
			else
			{
				this.ballSprites[i].position.x = -500;
				this.ballSprites[i].position.y = -500;
			}
		}
		this.lighthouseSpr.position.x = this.lightHousePositions[this.level][0];
		this.lighthouseSpr.position.y = this.lightHousePositions[this.level][1];
		this.shipSpr.position.x = this.startShipPositions[this.level][0];
		this.shipSpr.position.y = this.startShipPositions[this.level][1];
	},

	focusOnLightHouse: function(index)
	{
		for (var i = 0; i < 20; i++)
		{
			if( i == index)
			{
				this.ballSprites[i].animations.play('jump',30,false);
			}
			else
			{
				this.ballSprites[i].animations.stop(null, true);
				this.ballSprites[i].frame = 1;
			}
		}
	}
}
