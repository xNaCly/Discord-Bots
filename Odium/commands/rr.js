module.exports.init = () => {
	client.on("ready", () => {
		config.guilds.forEach(g => {
			g.commands.rr.listeners.forEach(rr => {
				client.guilds
					.get(g.id)
					.channels.find(x => x.id == rr.channel)
					.fetchMessage(rr.msg);
			});
		});

		client.on("messageReactionAdd", (reaction, user) => {
			if (user.id == client.user.id) return;
			if (!reaction.message.guild) return;

			var c = getConfig(reaction.message.guild).commands[
				"rr"
			].listeners.find(rr => rr.msg == reaction.message.id);

			if (c) {
				var u = client.guilds
					.get(reaction.message.guild.id)
					.member(user);
				if (u) u.addRole(c.role);
			}
		});

		client.on("messageReactionRemove", (reaction, user) => {
			var c = getConfig(reaction.message.guild).commands[
				"rr"
			].listeners.find(rr => rr.msg == reaction.message.id);

			if (c) {
				var u = client.guilds
					.get(reaction.message.guild.id)
					.member(user);
				if (u) u.removeRole(c.role);
			}
		});
	});
};

module.exports.run = (msg, args) => {
	switch (args[0]) {
		case "add":
			var c = msg.mentions.channels.first();
			var r = msg.mentions.roles.first();

			if (!r && args[4]) {
				var r = msg.guild.roles.find(
					x =>
						x.name.toLowerCase().indexOf(args[4].toLowerCase()) !=
						-1
				);
			}

			if (!c || !r || !args[1] || !args[2] || !args[3] || !args[4]) {
				return send(
					msg.channel,
					"help",
					"Reaction role",
					this.help.help
				);
			}

			c.fetchMessage(args[2])
				.then(message => {
					getConfig(message.guild).commands["rr"].listeners.push({
						channel: c.id,
						msg: message.id,
						emoji: args[3],
						role: r.id
					});
					message.react(args[3]);
				})
				.catch(e => {
					console.error(e);
					send(
						msg.channel,
						"help",
						"Reaction Role",
						"invalid messageid"
					);
				});
		default:
			send(msg.channel, "help", "Reaction Role", this.help.help);
			break;
	}
};

module.exports.help = {
	help: "rr add [channel] [messageid] [reactionemoji] [role]",
	description: "Ad"
};

module.exports.settings = {
	listeners: []
};

//function(channel, type, title, text, fields, thumbnail)
