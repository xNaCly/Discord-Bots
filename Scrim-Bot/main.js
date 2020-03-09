const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const Prefix = "--";
const jsonfile = require("jsonfile");
const stats = require("./stats.json");
const color = "#33ccff";


function saveVoc() {
	jsonfile
		.writeFile("stats.json", stats)
		.then(res => {
			console.log("Write complete");
		})
		.catch(error => console.error(error));
}

function timeouter(time, method) {
	setTimeout(() => {
		method();
	}, time);
}

//feedback if online
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online`);
	console.log(`prefix: ${Prefix}`);
	bot.user.setActivity(`${Prefix}help | v0.4 Alpha`, { type: "WATCHING" });

	bot.guilds.forEach(guild => {
		return console.log("Servername: " + guild.name);
	});
});

bot.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return help("#33ccff");

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	function statshelp(color1) {
		let embed = new Discord.RichEmbed()

			.setDescription("Scrims Starting!")
			.setColor(color1)
			.addField(
				"Resulst",
				"Send your Results with ``--stats`` ,but watch out you can only write ones!"
			)
			.setFooter(
				bot.user.username + " Bot coded by NaCl-y#4400",
				bot.user.displayAvatarURL
			);

		message.channel.send(embed);
	}

	function help() {
		let embed = new Discord.RichEmbed()
			.setDescription("Help- ScrimBot")
			.setTimestamp()
			.addField("**--setup**", "use ``--setup`` to setup the scrim-channel and roles + permissions")
			.addField("**--scrims**", "use ``--scrims`` to sign up for scrims")
			.addField(
				"**--stats**",
				"Use `--stats` to add your round results to the bot | Syntax: ``--stats [Kills]/[Ranking]``"
			)
			.addField("**--roundstart**", "Starts the round")
			.addField("**--roundend**", "Ends the round and gives results")
			.setColor(color)
			.setFooter(
				bot.user.username + " Bot coded by NaCl-y#4400",
				bot.user.displayAvatarURL
			);

		return message.channel.send(embed);
	}

	//round start
	if (cmd === `${Prefix}roundstart`) {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return (
				message.member.send("You arent allowed to use this command") &&
				message.delete()
			);

		let role = message.guild.roles.find("name", "scrim");
		message.guild.roles.find("name", "scrim").members.forEach(x => {
			let scrimrole = message.guild.roles.find("name", "scrimstart");

			if (x.presence.status != "offline") {
				x.send("Scrims starting rn!");
			}
			x.addRole(scrimrole);
			return message.channel.bulkDelete(100);
		});

		statshelp("#33ccff");
	}

	if (cmd === `${Prefix}stats`) {
		if (stats.stats.find(x => x.indexOf(message.member.user.id) != -1))
			return (
				message.member.send(
					"You cant have 2 results of one Match, dont fool me!"
				) && message.delete()
			);

		let content = message.content.slice("7");
		let stats1 = content.split("/");

		stats1[0] = parseInt(stats1[0]);
		stats1[1] = parseInt(stats1[1]);

		if (isNaN(stats1[0]) && isNaN(stats1[1])) {
			return message.channel.send("Please use a number");
		}

		if (stats1[0] > 99) {
			return message.channel.send("Please use a valid number");
		}
		if (!stats1[0]) {
			return message.channel.send("Please use a valid number");
		}
		if (!stats1[1]) {
			return message.channel.send("Please use a valid number");
		}

		var msgs;

		//Ranking points
		if (stats1[1] > 10) {
			msgs =
				"Player: " +
				message.author +
				" Kills: " +
				stats1[0] +
				" Placements: " +
				stats1[1] +
				" Points: " +
				stats1[0];
		} else {
			let Points = 0;

			if (stats1[1] <= 10) {
				Points += 2;
			}
			if (stats1[1] <= 5) {
				Points += 2;
			}
			if (stats1[1] <= 3) {
				Points += 2;
			}
			if (stats1[1] == 1) {
				Points += 7;
				message.author.send(
					"Congrats you have won a match on: " + message.guild.name
				);
			}

			var endpoints = parseInt(Points) + stats1[0];

			msgs =
				"Player: " +
				message.author +
				" Kills: " +
				stats1[0] +
				" Placements: " +
				stats1[1] +
				" Points: " +
				endpoints;
		}

		stats.stats.push(msgs);
		saveVoc();

		message
			.reply("``" + msgs + "`` zu Stats hinzugefügt")
			.then(msg => msg.delete(5000));
		message.delete();
	}

	//helpscrim bot
	if (cmd === `${Prefix}help`) {
		help();
	}

	//scrimrole add command
	if (cmd === `${Prefix}scrims`) {
		let scrimrole1 = message.guild.roles.find("name", "scrim");
		message.member.addRole(scrimrole1);

		message.member
			.send(
				"Your now signed up for scrims, watch out for the announcement"
			)
			.then(msg => msg.react("😦") && msg.react(":flag_de:"));
		return message.delete();
	}

	//round end
	if (cmd === `${Prefix}roundend`) {
		if (!message.member.hasPermission("ADMINISTRATOR"))
			return (
				message.member.send("You arent allowed to use this command") &&
				message.delete()
			);
		message.guild.roles.find("name", "scrim").members.forEach(x => {
			let scrimrole = message.guild.roles.find("name", "scrimstart");

			x.removeRole(scrimrole);
		});

		message.channel.bulkDelete(100);
		message.channel.send("Results of the last ");

		stats.stats = stats.stats.sort((x, y) => {
			var t = x.indexOf("Points: ");
			var a = y.indexOf("Points: ");
			t = x.slice(t + 8);
			a = y.slice(a + 8);

			if (a > t) {
				return 1;
			} else if (a < t) {
				return -1;
			} else {
				return 1;
			}
		});

		console.log(stats.stats);

		stats.stats = stats.stats.map((x, i) => {
			i += 1;
			if (i <= 3) {
				return i + ". " + x;
			} else {
				return x;
			}
		});

		message.channel.send(stats.stats);
		return timeouter(10000, () => {
			stats.stats = [];
			saveVoc();
		});
	}
	//servers
	if(cmd === `${Prefix}servers`){		
		bot.guilds.forEach(guild => {
			message.channel.send(guild.name + " Member: " + guild.memberCount);
		});
	}
	//setup
	if (cmd === `${Prefix}setup`) {
		let channel = message.guild.channels.find("name", "scrim");
		let role = message.guild.roles.find("name", "scrim");
		let role1 = message.guild.roles.find("name", "scrimstart");

		if (!role) {
			message.guild.createRole({
				name: "scrim"
			});
		}

		if (!role1) {
			message.guild.createRole({
				name: "scrimstart"
			});
		}

		if (!channel) {
			message.guild.createChannel("scrim", "text").then(
				scrim =>
					/*scrim.send(role + " " + role1)

				&*/

					scrim.overwritePermissions(role, {
						SEND_MESSAGES: false
					}) &
					scrim.overwritePermissions(role1, {
						SEND_MESSAGES: true
					})
			);
		}
	}
	//Invite
	if (cmd === `${Prefix}invite`) {
		let icon = bot.user.displayAvatarURL;

		let embed = new Discord.RichEmbed()

			.setTimestamp()
			.setThumbnail(icon)
			.setColor("#6441a5")
			.addField(
				"Invite-Link:",
				"https://discordapp.com/api/oauth2/authorize?client_id=576690801065852928&permissions=8&scope=bot"
			)
			.setFooter(bot.user.username, bot.user.displayAvatarURL);

		return message.channel.send(embed);
	}
});
bot.login(BOT_TOKEN);
