ENGINE.Bomb = function (args)
{
	_.extend(this,
	{
		direction: 0,
		timer: 50
	}, args);
};

ENGINE.Bomb.prototype =
{
    step: function (delta)
	{
        this.timer--;

		if (this.timer == 0)
		{
			this.explode();
			app.game.addScore(50);
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
			.fillRect(5 * (this.x / 5 | 0), 5 * (this.y / 5 | 0), 15, 15);
    },

	isColliding: function (x, y, width, height, hero)
	{
		//possibly comment this section out
		if (this.x <= x + width / 2 && this.x >= x - width / 2 && this.y - 50 <= y + height / 2 && this.y + 25 >= y - height / 2)
		{
			hero.level = -1;
		}
    },

	explode: function ()
	{
		var mod = 0;

		while (mod < 1)
		{
			app.game.spawnFire(this.x, this.y, Math.PI * mod, "#FF0000", 2500);
			app.game.spawnFire(this.x, this.y, Math.PI * mod, "#FFF000", 1500);
			app.game.spawnFire(this.x, this.y, Math.PI * mod, "#FFFF00	", 500);
			app.game.spawnFire(this.x, this.y, Math.PI + (Math.PI * mod), "#FF0000", 2500);
			app.game.spawnFire(this.x, this.y, Math.PI + (Math.PI * mod), "#FFF000", 1500);
			app.game.spawnFire(this.x, this.y, Math.PI + (Math.PI * mod), "#FFFF00", 500);
			mod += 0.05;
		}

		this.remove();
	},

	killBomb: function ()
	{
		this.remove();
	}
};
