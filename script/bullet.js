ENGINE.Bullet = function (args)
{
	_.extend(this,
	{
		x: 0,
		y: 0,
		direction: 0,
		speed: 256,

		/* silver bullets: good against waffles */
		color: "#cccccc",
		size: 2
	}, args);
};

ENGINE.Bullet.prototype =
{
	remove: function ()
	{
		this._remove = true;
		this.collection.dirty = true;
	},

	step: function (delta)
	{
		var md = delta / 1000;

        this.x += Math.cos(this.direction) * this.speed * md;
        this.y += Math.sin(this.direction) * this.speed * md;

		if (this.x < 0 || this.y < 0 || this.x > app.width || this.y > app.height)
		{
			this.remove();
		}
	},

	render: function ()
	{
		app.layer.fillStyle(this.color)
			.fillRect(this.x - 2, this.y - 2, this.size, this.size);
	},

	isColliding: function (x, y, width, height, hero)
	{
		app.game.entities.apply("bulletCollision", [this.x, this.y, hero, this]);
	}
};
