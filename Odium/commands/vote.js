module.exports.run = (msg, args) => {
	send(
		msg.channel,
		"Vote",
		"Vote",
		"https://discordbots.org/bot/569201129691283497/vote"
	);
};

module.exports.help = {
	help: "vote",
	description: "Votes for the bot"
};
