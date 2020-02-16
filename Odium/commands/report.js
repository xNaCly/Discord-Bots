module.exports.run = (msg, args) => {
	console.log("report");
	//command
	//report
	if (!args[1]) {
		let rUser = msg.guild.member(
			msg.mentions.users.first() || msg.guild.members.get(args[0])
		);
		if (!rUser) return msg.channel.send("Couldn´t find user.");
		let reason = args.join(" ").slice(22);

		log("report", rUser.id, msg.author.id, msg.channel);

		msg.delete().catch(O_o => {});
	}

	let rUser = msg.guild.member(
		msg.mentions.users.first() || msg.guild.members.get(args[0])
	);
	if (!rUser) return msg.channel.send("Couldn´t find user.");
	let reason = args.join(" ").slice(22);

	log("report", rUser.id, msg.author.id, reason, msg.channel);

	msg.delete().catch(O_o => {});
};

module.exports.help = {
	help: "report",
	description: "reports a user ``report [@user] [reason]"
};
