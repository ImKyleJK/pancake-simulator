var app = new ENGINE.Application
({
	width: window.innerWidth,
	height: window.innerHeight,

	oncreate: function ()
	{
		this.assets.addImage("butteryMan.png");
		this.assets.addImage("pancakeHero.png");
		this.assets.addImage("pancakeWizard.png");
		this.assets.addImage("fishLeft.png");
		this.assets.addImage("fishRight.png");
		this.assets.addImage("thereWillBeWaffle.png");
		this.loader.foo(500);
	},

	onready: function ()
	{
		this.selectScene(this.game);
	},
});
