ENGINE.Water = function (args)
{
	_.extend(this,
	{
		direction: Math.PI * 0.5,
		speed: Math.random() * 100 + 150,
		finished: 0
	}, args);
};

ENGINE.Water.prototype =
{
	step: function (delta)
	{
		this.y += Math.sin(this.direction) * this.speed * delta / 1000;

		if (this.x < 0 || this.y < 0 || this.x > app.width || this.y > app.height)
		{
			this.remove();
			app.game.spawnWater();
		}
	},

	render: function (delta)
	{
		app.layer
			.fillStyle("#00FFFF")
			.fillRect(5 * (this.x / 5 | 0), 5 * (this.y / 5 | 0), 2, 2);
	},

	remove: function ()
	{
		this._remove = true;
		this.collection.dirty = true;
	},

	isColliding: function (x, y, width, height, hero)
	{
		if (this.x <= x + width / 2 && this.x >= x - width / 2 && this.y <= y + height / 2 && this.y >= y - height / 2)
		{
			this.remove();
			app.game.spawnWater();
			hero.score++;
		} 
	},

	killWater: function ()
	{
		this.remove();
	}
};
