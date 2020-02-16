module.exports.run = (msg, args) => {
	let msgcont = msg.content.toString().slice(4);
	let channel = msg.guild.channels.find("name", "news");

	msg.delete();

	if (!channel) {
		return msg.guild.createChannel("name").then(x => x.send(msgcont));
	}

	channel.send(msgcont);
};

module.exports.help = {
	help: "say [text]",
	description: "say something in a channel"
};
