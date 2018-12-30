ENGINE.Star = function (args)
{
    _.extend(this,
	{
        direction: Math.PI,
        speed: Math.random() * 100 + 100,
        finished: 0
    }, args);
};

ENGINE.Star.prototype =
{
	step: function (delta)
	{
		this.x += Math.cos(this.direction) * this.speed * delta / 1000;

		if (this.x < 0)
		{
			this.remove();
			app.game.spawnStar();
		}
	},

	render: function (delta)
	{
		app.layer
			.fillStyle("#FFFFFF")
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
			app.game.spawnStar();
			hero.score++;
		}
	},

	killStar: function ()
	{
		this.remove();
	}
};
