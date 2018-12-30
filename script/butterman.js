ENGINE.Butterman = function(args)
{
	_.extend(this,
	{
		direction: Math.random() * 2 * Math.PI,
		image: app.assets.image("butteryMan"),
		speed: 500
	}, args);
};

ENGINE.Butterman.prototype =
{
	step: function (delta)
	{
		var md = delta / 1000;
		var xs = Math.cos(this.direction) * this.speed * md;
		var ys = Math.sin(this.direction) * this.speed * md;

		if (this.x + xs < 5 || this.y + ys < 5 || this.x + xs >= app.width - 20 || this.y + ys > app.height - 20)
		{
			this.direction += Math.random() * Math.PI ;
			this.x += Math.cos(this.direction) * this.speed * md;
			this.x += Math.sin(this.direction) * this.speed * md;
		} else {
			this.x += xs;
			this.y += ys;
		}

		app.game.spawnButterbit(this.x, this.y);
		app.game.spawnButterbit(this.x, this.y);
		app.game.spawnButterbit(this.x, this.y);
    },

	remove: function ()
	{
		//mark element for removal & tell collection that there is an element ready for removals
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

	killButterman: function ()
	{
		this.remove();
	}
};
