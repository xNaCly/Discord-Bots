module.exports.init = () => {};

global.log = async function(type, user, mod, reason, msgchannel) {
	var color;

	switch (type.toLowerCase()) {
		case "ban":
			color = "#990000";
			break;
		case "kick":
			color = "#ff0000";
			break;
		case "warn":
		case "mute":
		case "report":
			color = "#ff6600";
			break;
		case "clear":
			color = "#ff6600";
	}

	var channel = msgchannel.guild.channels.find(`name`, "report");
	var time = new Date().toGMTString().slice(5, -4);

	if (!channel){
		await msgchannel.guild
			.createChannel("report", "text")
			.then(x => (channel = x));
	}

	var fEmbed = new Discord.RichEmbed();
	if (user) {
		fEmbed.addField(type + " User:", `<@${user}>`);
	}

	fEmbed
		.setTitle("~" + type + "~")
		.addField(type + " by", `<@${mod}>`)
		.addField(type + " at", time);
	if (reason) {
		fEmbed.addField(type + " for", reason);
	}
	fEmbed
		.addField(type + " in", msgchannel)
		.setColor(color)
		.setFooter(
			client.user.username + " Bot coded by NaCl-y#4400 & Flam3rboy#5979",
			client.user.displayAvatarURL
		);

	channel.send(fEmbed);
};
