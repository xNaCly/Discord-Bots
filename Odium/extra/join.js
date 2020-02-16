module.exports.init = () => {
	client.on("guildCreate", guild => {
		guild
			._sortedChannels()
			.find(x => x.type == "text")
			.send(
				"FBI open up!\nhttps://tenor.com/view/fbi-raid-swat-gif-11500735\nAdminpannel: http://flam3rboy.ddns.net/#"
			);

		config.guilds.push(new guildConfig(guild));

		client.user.setActivity(
			`${prefix}help | watching ${client.guilds.size} Servers`,
			{ type: "WATCHING" }
		);

		let channel = guild.channels.find(x => x.name == "report");
		if (!channel) {
			return guild.createChannel("report", "text");
		}
	});
};

global.guildConfig = function(g) {
	var commands = {};
	var extra = {};

	client.commands.forEach((x, i) => {
		if (x.settings) {
			commands[i] = x.settings;
		}
	});

	client.extra.forEach((x, i) => {
		if (x.settings) {
			extra[i] = x.settings;
		}
	});

	this.id = g.id;
	this.name = g.name;
	this.commands = commands;
	this.extra = extra;
};
