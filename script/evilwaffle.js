ENGINE.Evilwaffle = function (args)
{
	_.extend(this,
	{
		direction: 0,
		speed: 1000,
		image: app.assets.image("thereWillBeWaffle")
	}, args);
};

ENGINE.Evilwaffle.prototype =
{
	step: function (delta)
	{
		var md = delta / 1000;
		var xs = Math.cos(this.direction) * this.speed * md;
		var ys = Math.sin(this.direction) * this.speed * md;

		if (this.x + xs < 5)
		{
			this.x = app.width - 20;
		} else if ( this.y + ys < 5 )
			{
				this.y = app.height - 20;
			} else if (this.x + xs >= app.width - 20 )
				{
					this.x = 5;
				} else if (this.y + ys > app.height - 20)
					{
						this.y = 5;
					}

		this.x += xs;
		this.y += ys;
	},

	remove: function ()
	{
		this._remove = true;
		this.collection.dirty = true;
	},

	render: function (delta)
	{
		app.layer
			.save()
			.translate(this.x, this.y)
			.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
			.restore();
	},

	isColliding: function (x, y, width, height, hero)
	{
		if (this.x <= x + width / 2 && this.x >= x - width / 2 && this.y - 50 <= y + height / 2 && this.y + 25 >= y - height / 2)
		{
			hero.level = -1;
		}
	},

	changeDir: function (dir)
	{
		switch (dir)
		{
			case 0:
				this.direction = 0;
				break;
			case 1:
				this.direction = Math.PI * 0.5;
				break;
			case 2:
				this.direction = Math.PI;
				break;
			case 3:
				this.direction = Math.PI * 1.5;
				break;
		}
	},

	dropBomb: function()
	{
		app.game.spawnBomb(this.x, this.y);
	},

	killEvilwaffle: function ()
	{
		this.remove();
	}
};
