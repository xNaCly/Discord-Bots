const ds = require("discord.js");
const bot = new ds.Client();
const conf = require("./config.json");
const prefix = conf.prefix;

//wait/sleep/timeout function
function sleep(time, method) {
	setTimeout(() => {
		method;
	}, time);
}

//connect event
bot.on("ready", async () => {
	console.log("Online as: " + bot.user.username);
	bot.user.setActivity("$role\n");
	bot.guilds.forEach(guilds => {
		console.log(guilds.name + " | " + guilds.memberCount);
	});
});

//message event
bot.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Die Befehle dieses Bots sind nicht für Privatnachrichten ausgelegt"
		);

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	if (cmd === `$roleall`) {
		let role = args[0];
		let foundit = message.guild.roles.find("name", role);
		message.guild.members.forEach(member => {
			member.addRole(foundit);
		});
	}

	// 	//embed sending function
	// 	function send(
	// 		channel_name,
	// 		title,
	// 		firstfield_title,
	// 		firstfield_content,
	// 		color,
	// 		secondfield_title,
	// 		secondfield_content,
	// 		thirdfield_title,
	// 		thirdfield_content
	// 	) {
	// 		if (channel_name === "none") {
	// 			let Embed = new ds.RichEmbed()
	// 				.addField(firstfield_title, firstfield_content)
	// 				.setDescription(title)
	// 				.setColor(color)
	// 				.setFooter(
	// 					bot.user.username + " Bot coded by NaCl-y#4400",
	// 					bot.user.displayAvatarURL
	// 				);

	// 			if (secondfield_title && secondfield_content) {
	// 				Embed.addField(secondfield_title, secondfield_content);
	// 			}
	// 			if (thirdfield_title && thirdfield_content) {
	// 				Embed.addField(thirdfield_title, thirdfield_content);
	// 			}
	// 			return message.channel.send(Embed);
	// 		}

	// 		let channel = message.guild.channels.find(`name`, channel_name);

	// 		let Embed = new ds.RichEmbed()
	// 			.addField(firstfield_title, firstfield_content)
	// 			.setDescription(title)
	// 			.setColor(color)
	// 			.setFooter(
	// 				bot.user.username + " Bot coded by NaCl-y#4400",
	// 				bot.user.displayAvatarURL
	// 			);

	// 		if (secondfield_title && secondfield_content) {
	// 			Embed.addField(secondfield_title, secondfield_content);
	// 		}
	// 		if (thirdfield_title && thirdfield_content) {
	// 			Embed.addField(thirdfield_title, thirdfield_content);
	// 		}
	// 		channel.send(Embed);
	// 	}

	// 	//ping msg event
	// 	if (cmd === `${prefix}ping`) {
	// 		send(
	// 			"none",
	// 			"Ping",
	// 			"Server: Eu",
	// 			"ping in ms: " + bot.ping,
	// 			"#3c8581"
	// 		);
	// 	}

	// 	if (cmd === `${prefix}bewerben`) {
	// 		message.member
	// 			.send(
	// 				"Danke für dein Interesse dich bei uns zu bewerben, bitte reacte hier mit '✅' um dich zubewerben oder mit '❌' um den Prozess zubeenden."
	// 			)
	// 			.then(x => x.react("✅") && x.react("❌"));
	// 		bot.on("messageReactionAdd", (reaction, user) => {
	// 			if (user.bot) return;
	// 			if (reaction.emoji.name === "❌") {
	// 				message.member.send("Bewerbungsprozess beendet.");
	// 				return;
	// 			}
	// 			if (reaction.emoji.name === "✅") {
	// 				message.member
	// 					.send(
	// 						"Bewerbungsprozess gestartet.\n\nBitte gib jetzt in einer nachricht die folgenden Daten an:\n\nWie Ist dein Ingame Name?\n\nAuf Welcher Plattform Spielst du?\n\nWie viele Arenapunkte hast du?\n\nWie viele Earnings hast du?\n\nWann Willst du Dein Tryout\n\nBitte schicke deine Youtube, Instagram und Twitch Links Hintereinander Falls du Keinen Hast schreibe: none\n\n Danke für deine Bewerbung :)"
	// 					)
	// 					.then(x => x.react("👌"));
	// 				// let filter =
	// 				// message.channel.awaitMessages(filter)
	// 			}
	// 		});
	// 	}
	// });
});

bot.login(conf.token);
