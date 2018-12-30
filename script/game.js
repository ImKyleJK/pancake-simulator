app.game = new ENGINE.Scene
({
	oncreate: function()
	{
		this.entities = new ENGINE.Collection(this);
	},

	onenter: function ()
	{
		this.hero = this.entities.add(ENGINE.Hero,
		{
			x: app.width / 2,
			y: app.height / 2,
			level: 0
		});

		this.clock = this.entities.add(ENGINE.Clock,
		{
			interval: 25,
			ticks: 0
		});
	},

	spawnWater: function()
	{
		this.entities.add(ENGINE.Water,
		{ 
			x: Math.random() * app.width, 
			y: 0
		});
	},

	spawnStar: function ()
	{
		this.entities.add(ENGINE.Star,
		{
			x: app.width,
			y: Math.random() * app.height
		});
	},

	spawnWall: function ()
	{
		this.entities.add(ENGINE.Wall,
		{
			x: app.width,
			y: Math.random() * app.height
		});
	},

	spawnButterman: function ()
	{
		this.entities.add(ENGINE.Butterman,
		{
			x: 0,
			y: Math.random() * app.height
		});
	},

	spawnButterbit: function (a, b)
	{
		this.entities.add(ENGINE.Butterbit,
		{
			x: a,
			y: b
		});
	},

	spawnFish: function ()
	{
		var dir = 0;
		var tx = 0;
		var ty = 0;
		var timage = "fishLeft";

		switch(this.clock.dir)
		{
			case 0:
				dir = 0;
				tx = 0;
				ty = app.height / 2 + Math.random() * app.height / 2;
				timage = "fishRight";
				break;
			case 1:
				dir = Math.PI * 0.5;
				tx = app.width / 2 + Math.random() * app.width / 2;
				ty = 0;
				timage = "fishLeft";
				break;
			case 2:
				dir = Math.PI;
				tx = app.width;
				ty = Math.random() * app.height / 2;
				timage = "fishLeft";
				break;
			case 3:
				dir = Math.PI * 1.5;
				tx = Math.random() * app.width / 2;
				ty = app.height;
				timage = "fishRight";
				break;
		}

		this.entities.add(ENGINE.Fish,
		{
			x: tx,
			y: ty,
			direction: dir,
			image: app.assets.image(timage)
		});
	},

	spawnEvilwaffle: function ()
	{
		this.entities.add(ENGINE.Evilwaffle,
		{
			x: 30,
			y: 30
		});
	},

	spawnBomb: function (a, b)
	{
		this.entities.add(ENGINE.Bomb,
		{
			x: a,
			y: b
		});
	},

	spawnFire: function (a, b, dir, c, s)
	{
		this.entities.add(ENGINE.Fire,
		{
			x: a,
			y: b,
			direction: dir,
			color: c,
			speed: s
		});
	},

	addScore: function (x)
	{
		this.hero.score += x;
	},

	onstep: function(delta)
	{
		this.entities.step(delta);
		this.entities.call("step", delta);

		if (this.hero.level ==-1)
		{
			this.entities.call("remove", delta);
			this.hero = this.entities.add(ENGINE.Hero,
			{
				x: app.width / 2,
				y: app.height / 2,
				level: 0
        	});

			this.clock = this.entities.add(ENGINE.Clock,
			{
				interval: 25,
				ticks: 0
			});

			document.getElementById('score').innerHTML = "Press Space";
		} else {
			if (this.hero.level < 4)
			{
				this.entities.apply("isColliding", [this.hero.x - 3, this.hero.y - 3, this.hero.image.width + 3, this.hero.image.height + 3, this.hero]);
			} else {
				this.entities.apply("isColliding", [this.hero.x - 5, this.hero.y + 20, this.hero.image.width - 10 , this.hero.image.height - 20, this.hero]);
				}

			document.getElementById('score').innerHTML = this.hero.score;

			if (this.hero.score >= 250 && this.hero.score < 750)
			{
				if (this.hero.level == 1)
				{
					this.entities.call("killWater", delta);
					this.clock.interval = 30;
					this.clock.ticks = 0;
					this.hero.level = 2;

					for (var i = 0; i < 500; i++)
					{
						this.spawnStar();
					}
				}

				if (this.clock.ticks == 0)
				{
					this.spawnWall();
					this.spawnWall();
				}
	        } else if (this.hero.score >= 750 && this.hero.score < 1250)
				{
					if (this.hero.level == 2)
					{
						this.entities.call("killStar", delta);
						this.entities.call("killWall", delta);
						this.hero.level = 3;
						this.spawnButterman();
						this.clock.interval = 200;
						this.clock.ticks = 0;
					}

					if (this.clock.ticks == 0) {
						this.spawnButterman();
					}
				} else if (this.hero.score >= 1250 && this.hero.score < 2000)
					{
						if (this.hero.level == 3)
						{
							this.entities.call("killButterman", delta);
							this.entities.call("killButterbit", delta);
							this.hero.level = 4;
							this.hero.image = app.assets.image("pancakeWizard");
							this.hero.render(delta);
							this.clock.interval = 200;
							this.clock.ticks = 0;
							this.clock.dir = 0;
						}
          
						if (this.clock.ticks == 0)
						{
							this.clock.dir = Math.round(Math.random() * 3);
						}

						if (this.clock.ticks < 150)
						{
							this.spawnFish();
						}
	        		} else if(this.hero.score >= 2000)
						{
							if (this.hero.level == 4)
							{
								this.entities.call("killFish", delta);
								this.hero.level = 5;
								this.clock.interval = 51;
								this.clock.ticks = 0;
								this.clock.dir = 0;
								this.spawnEvilwaffle();
							}

							if (this.clock.ticks == 0)
							{
								this.clock.dir = Math.round(Math.random() * 3);
								this.entities.apply("changeDir", [this.clock.dir]);
							} else if (this.clock.ticks == 25)
								{
									this.entities.call("dropBomb");
								} else if (this.clock.ticks == 50)
								{
									this.entities.call("dropBomb");
								}
						}
			}
	},

	onrender: function (delta)
	{
		app.layer.clear("#023");
		this.entities.call("render", delta);
	},
  
	onkeydown: function (key)
	{
		if (this.hero.level == 0 && key == "space")
		{
			this.hero.level = 1;

			for (var i = 0; i < 500; i++)
			{
				this.spawnWater();
			}
        }

		if (key == "w")
		{
			this.hero.direction = Math.PI * 1.5;
			this.hero.movW = 1;
		} else if (key == "a")
			{
				this.hero.direction = Math.PI;
				this.hero.movA = 1;
			} else if (key == "s")
				{
					this.hero.direction = Math.PI * 0.5;
					this.hero.movS = 1;
				} else if (key == "d")
					{
						this.hero.direction = Math.PI * 2;
						this.hero.movD = 1;
					} else if (this.hero.level >= 4 && key == "left")
						{
							this.hero.fire(Math.PI);
						} else if (this.hero.level >= 4 && key == "down")
							{
								this.hero.fire(Math.PI * 0.5);
							} else if (this.hero.level >= 4 && key == "right")
								{
									this.hero.fire(Math.PI * 2);
								} else if (this.hero.level >= 4 && key == "up")
									{
										this.hero.fire(Math.PI * 1.5);
									}
        
	},
  
	onkeyup: function (key)
	{
		if (key == "w")
		{
			this.hero.movW = 0;
		} else if (key == "a")
			{
				this.hero.movA = 0;
			} else if (key == "s")
				{
					this.hero.movS = 0;
				} else if (key == "d")
					{
						this.hero.movD = 0;
					}
	}
});
