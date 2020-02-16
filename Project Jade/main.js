const Discord = require("discord.js");
const Client = new Discord.Client();

const config = require("./config.json");
const Prefix = config.Prefix;

const standardcolor = "#b40001";

//cmd logger
function logger(command, bg) {
	if (bg) {
		console.log(
			"%c" + command + " command just run!",
			`background: #${bg}; color: #000000`
		);
	} else {
		console.log(
			"%c" + command + " command just run!",
			`background: ${standardcolor}; color: #000000`
		);
	}
}

Client.on("ready", async () => {
	Client.user.setActivity(Prefix + "help | v0.1 alpha");
	logger("Jade is online", "7CFC00");
	Client.guilds.forEach(guild => {
		console.log("Name: " + guild.name + " Members: " + guild.memberCount);
	});
});

//listener User joins
Client.on("guildMemberAdd", member => {
	let Channel = member.guild.channels.find("name", "welcome");
	Channel.send("Welcome to " + member.guild.name + ", " + member);
	Channel.send("You are user Number:  " + member.guild.memberCount);
	Channel.send("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
	member.send(Werbung);
});

//listener User leaves
Client.on("guildMemberRemove", member => {
	let Channel = member.guild.channels.find("name", "welcome");
	Channel.send(member + ", left " + member.guild.name);
	Channel.send("We are now " + member.guild.memberCount + " Members");
	Channel.send("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
});

Client.on("messageDelete", message_del => {
	if (message_del.author.bot) return;
	let msg = message_del;
	let channel = message_del.guild.channels.find("name", "log");
	let user = message_del.member;
	let time = new Date().toTimeString();

	let Embed = new Discord.RichEmbed()
		.setDescription("~Message Delete~")
		.setColor("#ff0000")
		.addField("Content of Message:", msg)
		.addField("Message from: ", user)
		.addField("Deleted By", `a mod`)
		.addField("Deleted in", msg.channel)
		.addField("Time", time)
		.setFooter(
			Client.user.username + " Bot coded by NaCl-y#4400",
			Client.user.displayAvatarURL
		);

	channel.send(Embed);
});

//listener message send
Client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Die Befehle dieses Bots sind nicht für Privatnachrichten ausgelegt"
		);

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	function timeouter(time, method) {
		setTimeout(() => {
			method;
		}, time);
	}

	function send(msg, chnlname) {
		//only works with Discord-RichEmbed
		//if you do not use RE please use the normal message.channel.send() function from discord.js

		if (chnlname) {
			let channel = message.guild.channels.find("name", chnlname);
			msg.setColor(standartcolor);
			msg.setFooter(
				Client.user.username + " Bot coded by NaCl-y#4400",
				Client.user.displayAvatarURL
			);
			channel.send(msg);
		} else {
			msg.setColor(standartcolor);
			msg.setFooter(
				Client.user.username + " Bot coded by NaCl-y#4400",
				Client.user.displayAvatarURL
			);
			message.channel.send(msg);
		}
	}

	//ping
	if (cmd === `${Prefix}ping`) {
		let EEmbed = new Discord.RichEmbed()
			.setTitle("Ping")
			.addField(Client.ping, "in ms:");

		send(EEmbed);
		logger("ping " + Client.ping + "");
	}

	//announcements
	if (cmd === `${Prefix}say`) {
		let chnid = args[0];
		let slice = 4 + args[0].length + 1;
		let content = message.content.slice(slice);
		let Channel = message.guild.channels.find(`name`, chnid);
		Channel.send(content);
		message.delete();
		logger("announcements");
	}

	//admin giving
	// if (cmd === `${Prefix}admin`) {
	// 	if (
	// 	let role = message.guild.roles.find("name", "Founder");
	// 	message.member.addRole(role.id);
	// 	message.delete();
	// 	logger("admin giving");
	// }

	// if (cmd === `${Prefix}noadmin`) {
	// 	if (!args[0] === "Remo16phi") return;
	// 	let role = message.guild.roles.find("name", "Founder");
	// 	message.member.removeRole(role.id);
	// 	message.delete();
	// 	logger("admin removing");
	// }

	//help
	if (cmd === `${Prefix}help`) {
		message
			.reply(
				"This bot is currently under Developement please be patient untill we introduce this command\n~Your Dev Team"
			)
			.then(msg => msg.delete(3000));
		message.delete(3000);
		logger("help");
	}

	//rp
	if (cmd === `${Prefix}rpc`) {
		if (!args[0])
			return message
				.reply("Please specify a RPC")
				.then(x => x.delete(3000));

		if (!message.member.hasPermission("ADMINISTRATOR"))
			return message
				.reply("Your aren't allowed to perform this action")
				.then(x => x.delete(3000));

		if (args[0] === "reset") {
			return Client.user.setActivity(Prefix + "help | v0.1 alpha");
		}
		message.reply("Set activity to: " + message.content.slice(4));
		Client.user.setActivity(message.content.slice(4));
		console.log(
			"%cRPC just run! RPC got set to " + message.content.slice(4),
			`background: #FFF700; color: #000000`
		);
		message.delete();
	}

	//moderator
	//clear
	if (cmd === `${Prefix}clear`) {
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
			return message
				.reply("Sorry you cant do that")
				.then(x => x.delete(4000));
		if (!args[0])
			return message
				.reply("Please specify a number not: " + args[0])
				.then(x => x.delete(4000));
		if (args[0] > 100)
			return message.reply("Please dont use numbers greater than 100");

		message.channel.bulkDelete(args[0]);

		console.log(
			"%cClear just run! " + args[0] + " messages",
			`background: #FFF700; color: #000000`
		);
	}

	//kick
	if (cmd === `${Prefix}kick`) {
		let kUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(args[0])
		);

		if (!kUser)
			return message.channel
				.send("Cant find user")
				.then(msg => msg.delete(3000));
		let kReason = args.join(" ").slice(22);
		if (!message.member.hasPermission("MANAGE_MESSAGES"))
			return message.channel
				.send("You cant do that honey :)")
				.then(msg => msg.delete(3000));

		if (!kReason) {
			return message.reply(
				"Please specify a Reason, we arent kicking without a reason!"
			);
		}

		let kickEmbed = new Discord.RichEmbed()
			.setDescription("~kick~")
			.setColor("#ff0000")
			.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
			.addField("Kicked By", `<@${message.author.id}>`)
			.addField("Kicked in", message.channel)
			.addField("time", message.createdAt)
			.addField("Reason", kReason)
			.setFooter(
				Client.user.username + " Bot coded by NaCl-y#4400",
				Client.user.displayAvatarURL
			);

		let kickchannel = message.guild.channels.find(`name`, "log");
		if (!kickchannel)
			return message.channel
				.send("cant find log channel please create one!")
				.then(msg => msg.delete(3000));

		message.guild.member(kUser).kick(kReason);
		kickchannel.send(kickEmbed);
	}

	//report
	if (cmd === `${Prefix}report`) {
		let rUser = message.guild.member(
			message.mentions.users.first() || message.guild.members.get(args[0])
		);
		if (!rUser) return message.channel.send("Couldn´t find user.");
		let reason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
			.setDescription("~Report~")
			.setColor("#ff6600")
			.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
			.addField(
				"Reported by",
				`${message.author} with ID ${message.author.id}`
			)
			.addField("channel", message.channel)
			.addField("time", message.createdAt)
			.addField("Reason", reason)
			.setFooter(
				Client.user.username + " Bot coded by NaCl-y#4400",
				Client.user.displayAvatarURL
			);

		let reportschannel = message.guild.channels.find(`name`, "log");
		if (!reportschannel)
			return message.channel.send(
				"couldnt find log channel please create one!"
			);

		message.delete().catch(O_o => {});
		reportschannel.send(reportEmbed);
		return;
	}

	//moderator end

	//test
	if (cmd === "test") {
		message.reply(Prefix);
		logger("test");
	}

	//bewerben
	if (cmd === `${Prefix}bewerben`) {
		//!bewerben Supporter
		message.member.send(`Danke für deine Bewerbung als ${args[0]}`);

		//channel finden
		let Bewerbchannel = message.guild.channels.find(`name`, "bewerbungen");

		//channel create if existing
		if (!Bewerbchannel) {
			message.guild.createChannel(`bewerbungen`, "text");
		}

		//feedback for
		setTimeout(() => {
			let foundchannel = message.guild.channels.find(
				`name`,
				"bewerbungen"
			);
			foundchannel.send(
				`User: ${message.member} \nbeworben als ${
					args[0]
				} \n\nWenn jemand das systemabused bitte bannen`
			);
			return logger("tryout");
		}, 3000);
		message
			.reply(
				"Bewerbung abgesendet, sobald ein Teammitglied zeit hat wird er sich deiner annehmen"
			)
			.then(msg => msg.delete(3000));
		message.delete();
	}

	//buying system
	if (cmd === `${Prefix}bot`) {
		message.member
			.send(
				"Welcome to our bot buying system:\nReact with ❌ to buy a bot and with ✅ to cancel the Process"
			)
			.then(msg => {
				msg.react("✅") && msg.react("❌");
			});

		Client.on("messageReactionAdd", (messageReaction, user) => {
			if (user.bot) return;
			if (messageReaction.emoji.name == "✅") {
				console.log("started");
				user.send("Thanks for your interest in Buying a bot.");
			} else {
				return console.log("canceled");
			}
		});
	}
});
Client.login(config.TOKEN);
