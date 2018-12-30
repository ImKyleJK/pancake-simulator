ENGINE.Wall = function (args)
{
	_.extend(this,
	{
		direction: Math.PI,
		tunnelSpeed: 300
	}, args);
};

ENGINE.Wall.prototype =
{
	step: function (delta)
	{
		this.x += Math.cos(this.direction) * this.tunnelSpeed * delta / 1000;

		if (this.x < 0)
		{
			this.remove();
		}
	},

	remove: function ()
	{
		this._remove = true;
		this.collection.dirty = true;
	},

	render: function (delta)
	{
		app.layer
			.fillStyle("#000000")
			.fillRect(5 * (this.x / 5 | 0), 5 * (this.y / 5 | 0), 20, app.height / 6);
	},

	isColliding: function (x, y, width, height, hero)
	{
		if (this.x <= x + width / 2 && this.x >= x - width / 2 && this.y <= y + height / 2 && this.y + app.height / 6 >= y - height / 2)
		{
			hero.level = -1;
		}
	},

	killWall: function()
	{
		this.remove();
	}
};
