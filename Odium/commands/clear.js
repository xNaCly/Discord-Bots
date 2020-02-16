module.exports.run = (msg, args) => {
	console.log("clear");
	//command
	//clear msg
	if (!msg.member.hasPermission("MANAGE_MESSAGES"))
		return msg.reply("nope u cant do that");
	if (!args[0])
		return msg.channel.send("Please specify the amount of msgs to delete!");

	if (args[0] > 100 || args[0] < 1) {
		msg.channel
			.send(`You can only delete 1-100 messages!`)
			.then(msg => msg.delete(3000));
	} else {
		msg.channel.bulkDelete(args[0]).then(() => {
			msg.channel
				.send(`Cleared ${args[0]} msgs!`)
				.then(msg => msg.delete(3000));
		});
	}

	let time = new Date().toGMTString().slice(5, -4);

	send(msg.channel, "info", "~clear~", undefined, undefined, [
		{
			name: "Cleared by",
			value: "<@" + msg.author.id + ">"
		},
		{
			name: "Cleared at",
			value: time
		},
		{
			name: "Cleared in channel",
			value: "<#" + msg.channel + ">"
		}
	]);

	// log("clear", undefined, undefined, args[0], msg.author.id, msg.channel);

	let clearchannel = msg.guild.channels.find(`name`, "report");
	if (!clearchannel) return msg.guild.createChannel("report", "text");
};

module.exports.help = {
	help: "clear",
	description: "deletes msg ``clear [amounst]``"
};
