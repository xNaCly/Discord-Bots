const Discord = require("discord.js");
const config = require("./config.json");
const Prefix = "!";
const client = new Discord.Client();

function timeouter(time, method) {
	setTimeout(() => {
		method();
	}, time);
}

client.on("ready", async () => {
	console.log(client.user.username + " Is Online!");
	client.user.setActivity(`Prefix: ` + Prefix);
	client.guilds.forEach(guild => {
		return console.log("Servername: " + guild.name);
	});
});

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return help("#33ccff");

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	async function say(Type, Title, content, msgchannel, author) {
		let channel = message.guild.channels.find("name", msgchannel);

		if (!channel) message.guild.createChannel(msgchannel, "text");

		let Embed = new Discord.RichEmbed()

			.setDescription(author)
			.addField(Title, content)
			.setFooter(
				client.user.username + " | Coded by NaCl-y",
				client.user.displayAvatarURL
			);

		if (Type) {
			let Type1 = Type.toLowerCase();

			if (Type1 === "report") {
				Embed.setColor("#ff5d00");
				Embed.setTimestamp();
			}
			if (Type1 === "kick") {
				Embed.setColor("#ff3200");
				Embed.setTimestamp();
			}
			if (Type1 === "warn") {
				Embed.setColor("#ffff00");
				Embed.setTimestamp();
			}
			if (Type1 === "ban") {
				Embed.setColor("#ff0000");
				Embed.setTimestamp();
			}
		}

		channel.send(Embed);

		console.log(
			Title +
				" " +
				content +
				" " +
				msgchannel +
				" " +
				author +
				" " +
				"On " +
				message.guild.name
		);
	}

	if (cmd === `test`) {
		return say("ban", "Banned", "Banned for Kek", "report", "NaCl-y");
	}
});

client.login(config.Token);

/*if (cmd === `${Prefix}role`) {
		if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
			return message.channel.send(
				"You do not have the Permissions to do that"
			);
		if (!args[0]) {
			let Embed = new Discord.RichEmbed()

				.setTitle(Prefix + "Role-Befehl")
				.setColor("#333333")
				.addField("Syntax:", Prefix + "``Role [@user] [RoleName]``")
				.setFooter(
					client.user.username + " Coded by NaCl-y",
					client.user.displayAvatarURL
				);

			return message.channel.send(Embed);
		}

		let User =
			message.guild.member(message.mentions.users.first()) ||
			message.guild.members.get(args[0]);
		let Role = message.guild.roles.find("name", args[1]);
		User.addRole(Role.id);
	}*/
