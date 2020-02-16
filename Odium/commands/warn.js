module.exports.run = (msg, args) => {
	console.log("warn");
	//command
	//report
	if (!args[1]) {
		let rUser = msg.guild.member(
			msg.mentions.users.first() || msg.guild.members.get(args[0])
		);
		if (!rUser) return msg.channel.send("Couldn´t find user.");
		let reason = args.join(" ").slice(22);

		log("warn", rUser.id, msg.author.id, msg.channel);

		let warnchannel = msg.guild.channels.find(`name`, "report");
		if (!warnchannel) return msg.guild.createChannel("report", "text");

		msg.delete().catch(O_o => {});
		return;
	}

	let rUser = msg.guild.member(
		msg.mentions.users.first() || msg.guild.members.get(args[0])
	);
	if (!rUser) return msg.channel.send("Couldn´t find user.");
	let reason = args.join(" ").slice(22);

	log("warn", rUser.id, msg.author.id, reason, msg.channel);

	let warnchannel = msg.guild.channels.find(`name`, "report");
	if (!warnchannel) return msg.guild.createChannel("report", "text");

	msg.delete().catch(O_o => {});
};

module.exports.help = {
	help: "warn",
	description: "warn`s a user ``warn [@user] [reason]``"
};
