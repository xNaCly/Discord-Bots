module.exports.init = () => {
	client.on("guildMemberRemove", member => {
		if (getConfig(member.guild).extra["leave"].active == "true") {
			var text = parseVariable(
				getConfig(member.guild).extra["leave"].text,
				member
			);

			const channel = member.guild.channels.find(
				x => x.id == getConfig(member.guild).extra["leave"].channel
			);

			if (!channel) {
				return member.guild.createChannel("leave", "text").then(x => {
					x.send(text);
					getConfig(member.guild).extra["leave"].channel.id = x.id;
				});
			}

			channel.send(text);
		}
	});
};

module.exports.settings = {
	channel: "",
	text: "{username} left {server}",
	active: "true"
};
