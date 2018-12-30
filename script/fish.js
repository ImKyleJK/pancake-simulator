ENGINE.Fish = function (args)
{
	_.extend(this,
	{
		direction: 0,
		x: 0,
		y: 0,
		speed: Math.random() * 100 + 150,
		image: app.assets.image("gayFishLeft")
	}, args);
};

ENGINE.Fish.prototype =
{
	step: function (delta)
	{
		this.x += Math.cos(this.direction) * this.speed * delta / 1000;
		this.y += Math.sin(this.direction) * this.speed * delta / 1000;

		if (this.x < 0 || this.y < 0 || this.x > app.width || this.y > app.height)
		{
			this.remove();
		}
	},

	render: function (delta)
	{
		app.layer
			.save()
			.translate(this.x, this.y)
			.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
			.restore();
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

    bulletCollision: function (x, y, hero, bullet)
	{
		if (x <= this.x + this.image.width / 2 && x >= this.x - this.image.width / 2 && y <= this.y + this.image.height && y >= this.y - this.image.height / 2)
		{
			hero.score += 5;
			this.remove();
			bullet.remove();
		}
	},

	killFish: function ()
	{
		this.remove();
	}
};
