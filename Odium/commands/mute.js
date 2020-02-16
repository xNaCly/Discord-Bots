module.exports.run = (msg, args) => {
	if (!msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
		return msg.reply("You cant do that, ask a mod");
	var User = msg.guild.member(
		msg.mentions.users.first() || msg.guild.members.get(args[0])
	);
	var Role = msg.guild.roles.find(`name`, "Mute");
	var Timeout = parseFloat(args[1]);
	//-mute [user] [time]

	if (!args[1]) {
		return msg.channel
			.send("Please input a valid time (in min)")
			.then(mesg => mesg.delete(5000));
	} else if (args[1] < 10) {
		args[1] = 10;
	}

	var Timeout = args[1] * 60 * 1000;

	setTimeout(() => {
		User.removeRole(Role.id);
		User.send(
			`You are now unmuted on ${
				msg.guild.name
			}, please behave yourself according to the rules!`
		);
	}, Timeout);

	if (!User) {
		return msg.channel
			.send("Please specify a user to mute")
			.then(x => x.delete(5000));
	}

	if (!Role) {
		msg.guild
			.createRole({
				name: "Mute",
				color: "#000000",
				permissions: []
			})
			.then(role => {
				User.addRole(role.id);
				User.send(`You are now muted for ${args[1]}min`);
				msg.guild.channels.forEach((channel, id) => {
					channel.overwritePermissions(role, {
						SEND_MESSAGES: false
					});
				});
				return log(
					"report",
					User.id,
					msg.author.id,
					"nervt",
					msg.channel
				);
			});
	} else {
		User.addRole(Role.id);
		User.send(
			`You are now muted for ${args[1]}min, on ${
				msg.guild.name
			}, muted from ${msg.member}`
		);

		msg.guild.channels.forEach((channel, id) => {
			channel.overwritePermissions(Role, {
				SEND_MESSAGES: false
			});
		});

		return log("mute", User.id, msg.author.id);
	}
};

module.exports.help = {
	help: "``mute [@user] [time in min]``",
	description: "mutes a user"
};
