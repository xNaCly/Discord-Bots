module.exports.run = (msg, args) => {
	var fields;
	var thumbnail;
	var title;
	var u = msg.mentions.users.first();
	var r = msg.mentions.roles.first();
	var c = msg.mentions.channels.first();

	if (u != undefined) {
		title = u.username;
		thumbnail = u.displayAvatarURL;
		try {
			var lastMessage = new Date(
				u.lastMessage.createdTimestamp
			).toGMTString();
		} catch (e) {
			lastMessage = "none";
		}
		fields = [
			{
				name: "Username",
				value: u.username,
				inline: true
			},
			{
				name: "Discriminator",
				value: u.discriminator,
				inline: true
			},
			{
				name: "Created at",
				value: new Date(u.createdAt).toGMTString(),
				inline: true
			},
			{
				name: "ID",
				value: u.id,
				inline: true
			},
			{
				name: "Last Message",
				value: lastMessage,
				inline: true
			},
			{
				name: "Tag",
				value: u.tag,
				inline: true
			}
		];

		u = msg.guild.member(u);

		if (u != undefined) {
			fields.push(
				{
					name: "Joined at",
					value: new Date(u.joinedTimestamp).toGMTString(),
					inline: true
				},
				{
					name: "Bannable",
					value: u.bannable,
					inline: true
				},
				{
					name: "Kickable",
					value: u.bannable,
					inline: true
				},
				{
					name: "Deaf",
					value: u.deaf,
					inline: true
				},
				{
					name: "Highest Role",
					value: "<@&" + u.highestRole.id + ">",
					inline: true
				},
				{
					name: "Voice Channel",
					value: u.voiceChannelID
						? "<#" + u.voiceChannelID + ">"
						: "no",
					inline: true
				},
				{
					name: "Roles:",
					value: "<@&" + u._roles.join(">\n<@&") + ">",
					inline: true
				}
			);
		}
	} else if (r != undefined) {
		title = r.name;
		thumbnail = "";
		fields = [
			{
				name: "Name",
				value: "<@&" + r.id + ">",
				inline: true
			},
			{
				name: "Position",
				value: r.calculatedPosition,
				inline: true
			},
			{
				name: "Mentionable",
				value: r.mentionable,
				inline: true
			},
			{
				name: "Members",
				value: "<@" + r.members.map(x => x.user.id).join(">\n<@") + ">",
				inline: true
			}
		];
	} else if (c != undefined) {
		title = c.name;
		thumbnail = "";
		fields = [
			{
				name: "Name",
				value: "<#" + c.id + ">",
				inline: true
			},
			{
				name: "Position",
				value: c.calculatedPosition,
				inline: true
			},
			{
				name: "Created at",
				value: new Date(c.createdAt).toGMTString(),
				inline: true
			},
			{
				name: "Deletable",
				value: c.deletable,
				inline: true
			},
			{
				name: "Parent",
				value: c.parentID ? "<#" + c.parentID + ">" : "",
				inline: true
			}
		];

		switch (c.type) {
			case "text":
				fields.push(
					{
						name: "Not safe for work",
						value: c.nsfw,
						inline: true
					},
					{
						name: "Topic",
						value: c.topic ? c.topic : "none",
						inline: true
					},
					{
						name: "Members",
						value:
							"<@" +
							c.members.map(x => x.user.id).join(">\n<@") +
							">",
						inline: true
					}
				);
				break;
			case "voice":
				break;
			case "category":
				break;
		}
	} else {
		switch (args[0]) {
			case undefined:
				return send(msg.channel, "help", "Info", this.help.help);
				break;
			case "bot":
				title = "Bot";
				thumbnail = client.user.displayAvatarURL;
				fields = [
					{
						name: "Name",
						value: client.user.username,
						inline: true
					},
					{
						name: "# of Channels",
						value: client.channels.size,
						inline: true
					},
					{
						name: "# of Users",
						value: client.users.size,
						inline: true
					},
					{
						name: "# of Guild",
						value: client.guilds.size,
						inline: true
					},
					{
						name: "Ping",
						value: Math.floor(client.ping),
						inline: true
					},
					{
						name: "Help command",
						value: "``" + prefix + "help``",
						inline: true
					},
					{
						name: "Uptime",
						value: new Date(client.uptime)
							.toISOString()
							.slice(11, -5),
						inline: true
					}
				];
				break;
			case "server":
				title = "Bot";
				thumbnail = msg.guild.iconURL;
				fields = [
					{
						name: "Name",
						value: msg.guild.name,
						inline: true
					},
					{
						name: "Guild Id",
						value: msg.guild.id,
						inline: true
					},
					{
						name: "Created at",
						value: new Date(msg.guild.createdAt).toGMTString(),
						inline: true
					},
					{
						name: "Default Channel",
						value: msg.guild.defaultChannel
							? "<#" + msg.guild.defaultChannel + ">"
							: "none",
						inline: true
					},
					{
						name: "Region",
						value: msg.guild.region,
						inline: true
					},
					{
						name: "Verfication Level",
						value: msg.guild.verificationLevel,
						inline: true
					},
					{
						name: "# of channels",
						value: msg.guild.channels.size,
						inline: true
					},
					{
						name: "# of roles",
						value: msg.guild.roles.size,
						inline: true
					},
					{
						name: "# of members",
						value: msg.guild.memberCount,
						inline: true
					},
					{
						name: "# of bots",
						value: msg.guild.members.filter(x => x.user.bot).size,
						inline: true
					},
					{
						name: "Owner",
						value: "<@" + msg.guild.ownerID + ">",
						inline: true
					},
					{
						name: "Admins",
						value:
							"<@" +
							msg.guild.members
								.filter(x => x.hasPermission(8))
								.map(x => x.user.id)
								.join(">\n<@") +
							">",
						inline: true
					}
				];
				break;
			default:
				break;
		}
	}
	send(msg.channel, "info", title, "", fields, thumbnail);
};

module.exports.help = {
	help: "info bot\ninfo server\ninfo [user]\ninfo [role]\ninfo [channel]",
	description: "Info about role, server, user, bot"
};
