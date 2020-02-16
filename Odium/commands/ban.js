module.exports.run = (msg, args) => {
	console.log("ban");
	//command
	//ban
	if (!args[1]) {
		let bUser = msg.guild.member(
			msg.mentions.users.first() || msg.guild.members.get(args[0])
		);
		if (!bUser) return msg.channel.send("Cant find user");
		let bReason = args.join(" ").slice(22);
		if (!msg.member.hasPermission("BAN_MEMBERS"))
			return msg.channel.send("You cant do that honey :)");

		log("ban", rUser.id, msg.author.id, msg.channel);

		let banchannel = msg.guild.channels.find(`name`, "report");
		if (!banchannel) return msg.guild.createChannel("report", "text");

		msg.guild.member(bUser).ban(bReason);
		return;
	}

	let bUser = msg.guild.member(
		msg.mentions.users.first() || msg.guild.members.get(args[0])
	);
	if (!bUser) return msg.channel.send("Cant find user");
	let bReason = args.join(" ").slice(22);
	if (!msg.member.hasPermission("BAN_MEMBERS"))
		return msg.channel.send("You cant do that honey :)");

	log("ban", rUser.id, msg.author.id, reason, msg.channel);

	let banchannel = msg.guild.channels.find(`name`, "report");
	if (!banchannel) return msg.guild.createChannel("report", "text");

	msg.guild.member(bUser).ban(bReason);
};

module.exports.help = {
	help: "ban",
	description: "bans a user ``!ban [@user] [reason]``"
};
