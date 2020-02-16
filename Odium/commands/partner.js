module.exports.init = function() {
	// setInterval(() => {
	// 	config.partner.forEach(p => {
	// 		if (new Date().getTime() - p.last > 172800000) {
	// 			client.guilds
	// 				.first()
	// 				.channels.get("563090581304246309")
	// 				.send({
	// 					embed: {
	// 						author: {
	// 							name: client.guilds.first().member(p.user).user
	// 								.username,
	// 							icon_url: client.guilds.first().member(p.user)
	// 								.user.avatarURL
	// 						},
	// 						description: p.text
	// 					}
	// 				});
	// 			p.last = new Date().getTime();
	// 		}
	// 	});
	// }, 1000 * 20);
	// client.on("messageReactionAdd", (reaction, user) => {
	// 	if (user.id === client.user.id) return false;
	// 	if (reaction.message.author.id !== client.user.id) return false;
	// 	if (reaction.message.content.indexOf("Partner request") == -1) {
	// 		return false;
	// 	}
	// 	console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
	// 	var i = reaction.message.content.indexOf("@") + 1;
	// 	var e = reaction.message.content.indexOf(">");
	// 	var userid = reaction.message.content.slice(i, e);
	// 	var member = client.guilds.first().member(userid);
	// 	if (member === null)
	// 		return reaction.message.channel.send(
	// 			"Fehler Nutzer nicht gefunden: " + userid
	// 		);
	// 	member.removeRole("567023628747669549").catch(e => console.error(e));
	// 	switch (reaction.emoji.name) {
	// 		case "❌":
	// 			member.send(
	// 				"Die Anforderungen für eine Partnerschaft haben leider nicht gereicht!"
	// 			);
	// 			user.send("Erfolgreich abgelehnt");
	// 			break;
	// 		case "✅":
	// 			member.send(
	// 				"Du bist nun akzeptiert mit deinem Discord, bitte geb mir die Partner Rolle, damit du bei uns Partner bist, schreib in <#567021931505778696> mit ```!partner text [Text]``` deinen Text, er wird dann 3x die Woche gepostet."
	// 			);
	// 			member.addRole("530351414636052480");
	// 			user.send("Erfolgreich angenommen");
	// 			break;
	// 	}
	// });
	// client.on("messageReactionRemove", (reaction, user) => {
	// 	if (user.id !== client.user.id) {
	// 		console.log(
	// 			`${user.username} removed their "${
	// 				reaction.emoji.name
	// 			}" reaction.`
	// 		);
	// 	}
	// });
};

module.exports.run = function(msg, args) {
	switch (args[0]) {
		case "add":
			if (args[1] == undefined) {
				send(msg.channel, "error", "Partner", this.help.help);
			} else {
				var invite = args[1].replace("https://discord.gg/", "");
				client
					.fetchInvite(invite)
					.then(async x => {
						if (
							x.memberCount >=
							getConfig(msg.guild).commands["partner"].memberCount
						) {
							send(
								msg.channel,
								"success",
								"Partner",
								"You are now in the partner test phase and have to wait for the leader to write to you!"
							);

							const filter = (reaction, user) => {
								return (
									["✅", "❌"].includes(
										reaction.emoji.name
									) && client.user.id === msg.author.id
								);
							};

							var request;

							var channel = msg.guild.channels.find(
								x =>
									x.name.toLowerCase().indexOf("partner") !=
										-1 && x.type == "text"
							);

							if (!channel) {
								channel = await msg.guild.createChannel(
									"partner",
									"text"
								);
							}

							send(
								channel,
								"",
								"Partner request",
								"<@" +
									msg.author.id +
									"> Requested Partner Role for the Discord Server: " +
									invite
							).then(x => {
								x.react("✅");
								x.react("❌");

								x.awaitReactions(filter, {
									max: 1,
									time: 60000,
									errors: ["time"]
								})
									.then(collected => {
										const reaction = collected.first();

										if (reaction.emoji.name === "✅") {
											send(
												x.channel,
												"success",
												"Partner accepted"
											);
										} else if (
											reaction.emoji.name === "❌"
										) {
											send(
												x.channel,
												"success",
												"Partner rejected"
											);
										}
									})
									.catch(collected => {
										msg.reply(
											"you didn't react in a minute"
										);
									});
							});

							invite = args[1];
						} else {
							send(
								msg.channel,
								"error",
								"Partner",
								"You have too few members! You need at least " +
									getConfig(msg.guild).commands["partner"]
										.memberCount +
									" users!"
							);
						}
					})
					.catch(e => {
						send(
							msg.channel,
							"error",
							"Partner",
							"Invalid Invite!\n" + e
						);
					});
			}
			break;
		case "text":
			if (args[1] == undefined) {
				send(msg.channel, "error", "Partner", this.help.help);
			} else {
				if (
					msg.member.roles.find(x => x.id == "530351414636052480") ==
					null
				) {
					send(
						msg.channel,
						"error",
						"Partner",
						"You do not have the partner role!"
					);
				} else {
					var p = config.partner.find(x => x.user == msg.author.id);
					var text = msg.content.replace(
						prefix + "partner text ",
						""
					);

					if (p == undefined) {
						config.partner.push(new partner(msg.author.id, text));
					} else {
						p.text = text;
					}

					send(
						msg.channel,
						"success",
						"Partner: text updated to:",
						text,
						undefined,
						client.user.displayAvatarURL
					);
				}
			}
			break;
		case "remove":
			try {
				if (!msg.member.hasPermission(8)) {
					send(
						msg.channel,
						"error",
						"You have no Admin Permissions!"
					);
				}

				var userid = msg.mentions.users.first().id;
				var member = client.guilds.first().member(userid);

				member
					.removeRole("530351414636052480")
					.catch(e => console.error(e));

				config.partner.splice(
					config.partner.find(x => x.user == userid),
					1
				);

				send(msg.channel, "success", "Partner deleted");
			} catch (e) {
				send(msg.channel, "error", "Partner", e.msg);
			}

			break;
		case undefined:
			send(msg.channel, "error", "Partner", this.help.help);
			break;
	}
};

module.exports.settings = {
	list: [],
	partnerRole: "",
	channel: "",
	memberCount: 300,
	time: 1000 * 60 * 60 * 24
};

function partner(user, text) {
	this.user = user;
	this.text = text;
	this.last = 0;
}

module.exports.help = {
	help:
		"partner add [invite link]\npartner remove [user]\npartner text [text]",
	description: "Partner Managment"
};
