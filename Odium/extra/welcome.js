module.exports.init = () => {
	client.on("guildMemberAdd", member => {
		if (getConfig(member.guild).extra["welcome"].active == "true") {
			var text = parseVariable(
				getConfig(member.guild).extra["welcome"].text,
				member
			);

			const channel = member.guild.channels.find(
				x => x.id == getConfig(member.guild).extra["welcome"].channel
			);

			if (!channel) {
				return member.guild.createChannel("welcome", "text").then(x => {
					x.send(text);
					getConfig(member.guild).extra["welcome"].channel.id = x.id;
				});
			}

			channel.send(text);
		}
	});
};

module.exports.settings = {
	channel: "",
	text: "Hey ${username}, welcome to ${server} 🤗 🎉Have fun!",
	active: "true"
};

global.parseVariable = function(text, member) {
	return text
		.replace(/{username}/g, member.user)
		.replace(/{id}/g, member.user.id)
		.replace(/{server}/g, member.guild.name)
		.replace(/{membercount}/g, member.guild.memberCount)
		.replace(/{invite}/g, member.guild.memberCount);
};
