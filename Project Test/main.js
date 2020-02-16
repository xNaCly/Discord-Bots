const Discord = require("discord.js");
const config = require("./config.json");
const jsonfile = require("jsonfile");
const log = require("./log.json");
const Pre = config.prefix;
const Client = new Discord.Client();

function logger(log_content){
	console.log("%c" +  log_content + " | " + new Date().toTimeString().slice(0,8),`background: #ffcc00; color: #000000`)
}

function log_file() {
	jsonfile
		.writeFile("log.json", log)
		.then(res => {
			console.log("Write complete");
		})
		.catch(error => console.error(error));
}


Client.on("ready", async () => {

	console.log(
		"%c" + Client.user.username + " is online",
		`background: #00ff00; color: #000000`
	);
	console.log("-------------------------------");
	console.log("\nPrefix: " + Pre + "\nToken: " + config.token);
	var Time = new Date().toTimeString().slice(0,8);
	console.log("-------------------------------");
	console.log("\nLast Start of Client: " + Time);

	Client.user.setActivity("Online ma dudes");
});

Client.on("message", message => {
	//uptimefunction with get time
	// let last_online_status = new Date.toTimeString()
	// let ms = last_online_status.getTime()

	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Die Befehle dieses Bots sind nicht für Privatnachrichten ausgelegt"
		);

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);



	if (cmd === `${Pre}test`){
		log.log.push(message.content)
		log_file();
	}
});
Client.login(config.token);

