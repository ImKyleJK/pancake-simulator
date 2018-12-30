ENGINE.Hero = function (args)
{
	_.extend(this,
	{
		x: 0,
		y: 0,
		direction: 0,
		image: app.assets.image("pancakeHero"),
		speed: 400,
		movW: 0,
		movA: 0,
		movS: 0,
		movD: 0,
		score: 0,
		level: 0,
		wandDirection: 0
	}, args);
};

ENGINE.Hero.prototype =
{
	step: function (delta)
	{
		var md = delta / 1000;
		var xs = Math.cos(this.direction) * this.speed * md;
		var ys = Math.sin(this.direction) * this.speed * md;

		if (this.movA || this.movW || this.movD || this.movS)
		{
			if (this.x + xs > 30 && this.x + xs < app.width - 30)
			{
				this.x += xs;
			}

			if (this.y + ys > 10 && this.y + ys < app.height - 10)
			{
				this.y += ys;
			}
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
			.save()
			.translate(this.x, this.y)
			.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
			.restore();
	},

	fire: function (dir)
	{
		if (this.level == 4)
		{
			this.collection.add(ENGINE.Bullet,
			{
				x: this.x,
				y: this.y,
				direction: dir
			});
        } else {
			this.collection.add(ENGINE.Bullet,
			{
				x: this.x,
				y: this.y,
				size: 10,
				speed: 450,
				direction: dir
			});
		}
	}
};
