module.exports.run = (msg, args) => {
	console.log("ping");

	return msg.channel.send(
		"Ping: " + Math.round(client.ping) + " ms."
	);
};

module.exports.help = {
	help: "",
	description: "Ping"
};
