module.exports.run = (msg, args) => {
	console.log("kick");
	//command
	//kick
	if (!args[1]) {
		let kUser = msg.guild.member(
			msg.mentions.users.first() || msg.guild.members.get(args[0])
		);
		if (!kUser) return msg.channel.send("Cant find user");
		let kReason = args.join(" ").slice(22);
		if (!msg.member.hasPermission("KICK_MEMBERS"))
			return msg.channel.send("You cant do that honey :)");

		let kickEmbed = new Discord.RichEmbed()
			.setDescription("~kick~")
			.setColor("#ff0000")
			.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
			.addField("Kicked By", `<@${msg.author.id}>`)
			.addField("Kicked in", msg.channel)
			.addField("time", msg.createdAt)
			.setFooter(
				client.user.username +
					" Bot coded by NaCl-y#4400 & Flam3rboy#5979",
				client.user.displayAvatarURL
			);

		let kickchannel = msg.guild.channels.find(`name`, "report");
		if (!kickchannel) return msg.guild.createChannel("report", "text");

		msg.guild.member(kUser).kick(kReason);
		kickchannel.send(kickEmbed);
		return;
	}

	let kUser = msg.guild.member(
		msg.mentions.users.first() || msg.guild.members.get(args[0])
	);
	if (!kUser) return msg.channel.send("Cant find user");
	let kReason = args.join(" ").slice(22);
	if (!msg.member.hasPermission("KICK_MEMBERS"))
		return msg.channel.send("You cant do that honey :)");

	let kickEmbed = new Discord.RichEmbed()
		.setDescription("~kick~")
		.setColor("#ff0000")
		.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
		.addField("Kicked By", `<@${msg.author.id}>`)
		.addField("Kicked in", msg.channel)
		.addField("time", msg.createdAt)
		.addField("Reason", kReason)
		.setFooter(
			client.user.username + " Bot coded by NaCl-y#4400 & Flam3rboy#5979",
			client.user.displayAvatarURL
		);

	let kickchannel = msg.guild.channels.find(`name`, "report");
	if (!kickchannel) return msg.guild.createChannel("report", "text");

	msg.guild.member(kUser).kick(kReason);
	kickchannel.send(kickEmbed);
};

module.exports.help = {
	help: "kick",
	description: "Kicks a user ``kick [@user] [reason]``"
};
