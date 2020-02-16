global.Discord = require("discord.js");
global.Util = require("discord.js");
global.client = new Discord.Client();
global.config = require("./config.json");
var botconfig = require("./botconfig.json");
var fs = require("fs");
var request = require("request");
var http = require("http");
var socket = require("socket.io");
var basic = require("./basic");
var web = require("./web");
global.YouTube = require("simple-youtube-api");
global.ytdl = require("ytdl-core");
global.jsonfile = require("jsonfile");
global.randomPuppy = require("random-puppy");

global.prefix = "-";

global.youtube = new YouTube(botconfig.googleapikey);

client.commands = new Discord.Collection();
client.extra = new Discord.Collection();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(
		`${prefix}help | watching ${client.guilds.size} Servers`,
		{ type: "WATCHING" }
	);
});

basic.init(fs);
// web.init({ express: express, request: request, http: http, socket: socket });

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Please use Commands for this bot in a server-chat!"
		);

	let messageArray = message.content.split(" ");
	if (message.content.startsWith(prefix)) {
		let cmd = messageArray[0].toLowerCase().slice(prefix.length);
		let args = messageArray.slice(1);

		if (client.commands.get(cmd) != undefined) {
			client.commands.get(cmd).run(message, args);
		}
	}
});

client.login(botconfig.token);
