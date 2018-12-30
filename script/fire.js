ENGINE.Fire = function (args)
{
	_.extend(this,
	{
		speed: 2500,
		life: 0,
		color: "#FF0000"
	}, args);
};

ENGINE.Fire.prototype =
{
    step: function (delta)
	{
		this.life++;
		this.x += Math.cos(this.direction) * (this.speed / this.life) * delta / 1000;
		this.y += Math.sin(this.direction) * (this.speed / this.life) * delta / 1000;

		if (this.life == 10)
		{
			this.remove();
		}
    },

	render: function (delta)
	{
		app.layer
			.fillStyle(this.color)
			.fillRect(5 * (this.x / 5 | 0), 5 * (this.y / 5 | 0), 5, 5);
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
			hero.level = -1;
		}
	},

	killFire: function ()
	{
		this.remove();
	}
};
