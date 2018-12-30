ENGINE.Butterbit = function (args)
{
	_.extend(this,
	{
		direction: 0,
		speed: 6,
		brainDelta: 0,
		life: 100
	}, args);
};

ENGINE.Butterbit.prototype =
{
	step: function (delta)
	{
        if (this.life == 0)
		{
			this.remove();
		}

		this.brainDelta -= 2 * delta;

		if (this.brainDelta < 0)
		{
			this.direction = Math.random() * Math.PI * 2;
			this.brainDelta = Math.random() * 2000;
		}

		this.speed += 8 * delta / 1000;
		this.x += Math.cos(this.direction) * this.speed * delta / 1000;
		this.y += Math.sin(this.direction) * this.speed * delta / 1000;

		if (this.x < 0 || this.y < 0 || this.x > app.width || this.y > app.height)
		{
			this.remove();
		}

		this.life--;
	},

	render: function (delta)
	{
		app.layer
			.fillStyle("#FFFF00")
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
			hero.score++;
		}
	},

	killButterbit: function ()
	{
		this.remove();
	}
};
