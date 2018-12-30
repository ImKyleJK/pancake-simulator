ENGINE.Clock = function (args)
{
	_.extend(this,
	{
		interval: 20,
		ticks: 0,
		dir: 0
	}, args);
};

ENGINE.Clock.prototype =
{
	step: function (delta)
	{
		if (this.ticks + 1 >= this.interval)
		{
			this.ticks = 0;
		} else {
			this.ticks++;
		}
	},

	remove: function ()
	{
		this._remove = true;
		this.collection.dirty = true;
	}
};
