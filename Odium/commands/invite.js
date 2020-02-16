module.exports.run = (msg, args) => {
	send(msg.channel, "Invite", "Invite", "https://discord.gg/UV7KuEj");
};

module.exports.help = {
	help: "invite",
	description: "Join the discord to get help with the bot"
};
