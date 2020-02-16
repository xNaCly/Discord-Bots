const express = require("express");
const request = require("request");
const JSON = require("circular-json");
var Base64 = require("js-base64").Base64;
const app = express();
var port = 2008;
const server = app.listen(port, () => {
	console.log("Listening on port: " + port);
});
global.io = require("socket.io")(server);

app.get("/authorize", (req, res) => {
	console.log(req.query.code);
	request.post(
		"https://discordapp.com/api/v6/oauth2/token",
		{
			form: {
				client_id: "569201129691283497",
				client_secret: "CiCU7SLNgXYbBfhqEzoRygWKCfQ30330",
				grant_type: "authorization_code",
				code: req.query.code,
				scope: "identify guilds",
				redirect_uri: "http://flam3rboy.ddns.net/api/authorize"
			}
		},
		function(error, response, body) {
			body = JSON.parse(body);
			try {
				if (body.error) {
					io.to(req.query.state).emit("data", {
						code: req.query.code,
						error: body.error,
						error_description: body.error_description
					});
				} else {
					io.to(req.query.state).emit("data", {
						code: req.query.code,
						token: body
					});
				}
			} catch (e) {}
		}
	);
	res.send("");
});

app.get("/bot", (req, res) => {
	res.send("<script>window.close()</script>");
});

io.on("connection", function(socket) {
	console.log("an user connected", socket.id);
});

app.get("/guild/:id/config/:cmd/set/:setting/:value", (req, res) => {
	var g = config.guilds.find(x => x.id == req.params.id);
	if (g == undefined) return res.send("error: undefined Guild");

	var cmd = g.extra[req.params.cmd];
	if (!cmd) {
		cmd = g.commands[req.params.cmd];
	}

	if (!cmd) return res.send("error: command not found");

	cmd[req.params.setting] = Base64.decode(req.params.value);

	res.send("true");
});

app.get("/guild/:id/cmd/", (req, res) => {
	var g = config.guilds.find(x => x.id == req.params.id);
	if (g == undefined) return res.send("error: undefined Guild");
	var text = Base64.decode(req.param("text"));

	JSON.parse(req.param("roles")).forEach(role => {
		client.guilds
			.get(req.params.id)
			.roles.find(x => x.id == role)
			.members.forEach(member => {
				member.send(text).catch(e => {});
			});
	});

	if (req.param("channel")) {
		client.guilds
			.get(req.params.id)
			.channels.find(x => x.id == req.param("channel"))
			.send(text)
			.catch(e => {});
	}

	res.send("true");
});

app.get("/guild/:id/channel/:channel/messages", (req, res) => {
	var g = client.guilds.get(req.params.id);
	if (g == undefined) return res.send("error: undefined Guild");
	var c = g.channels.get(req.params.channel);
	if (c == undefined) return res.send("error: undefined Channel");

	c.fetchMessages({ limit: 100 }).then(x => {
		var data = [];

		x.array().forEach(x => {
			var a = [];
			x.attachments.array().forEach(y => a.push(y.url));
			var reactions = [];

			x.reactions.array().forEach(r => {
				reactions.push({
					count: r.count,
					emoji: r.emoji.name,
					url: r.emoji.url
				});
			});

			if (x.embeds[0]) {
				data.push({
					id: x.id,
					createdTimestamp: x.createdTimestamp,
					content:
						"<h5>" +
						x.embeds[0].title +
						"</h5>" +
						x.embeds[0].description,
					author: {
						tag: x.author.tag,
						avatar: x.author.displayAvatarURL
					},
					attachments: a,
					reactions: reactions
				});
			} else {
				data.push({
					id: x.id,
					createdTimestamp: x.createdTimestamp,
					content: x.content,
					author: {
						tag: x.author.tag,
						avatar: x.author.displayAvatarURL
					},
					attachments: a,
					reactions: reactions
				});
			}
			return x;
		});

		res.send(JSON.stringify(data));
	});
});

app.get("/guild/:id/say/:channel/:roles/:text", (req, res) => {
	var g = config.guilds.find(x => x.id == req.params.id);
	if (g == undefined) return res.send("error: undefined Guild");
	var text = Base64.decode(req.params.text);

	console.log(JSON.parse(req.params.roles));

	JSON.parse(req.params.roles).forEach(role => {
		client.guilds
			.get(req.params.id)
			.roles.find(x => x.id == role)
			.members.forEach(member => {
				member.send(text).catch(e => {});
			});
	});

	if (req.params.channel) {
		client.guilds
			.get(req.params.id)
			.channels.find(x => x.id == req.params.channel)
			.send(text)
			.catch(e => {});
	}

	res.send("true");
});

app.get("/guild/:id/config/", (req, res) => {
	var g = config.guilds.find(x => x.id == req.params.id);
	if (g == undefined) return res.send("error: undefined Guild");

	res.send(JSON.stringify(g));
});

app.get("/stats/", (req, res) => {
	var data = {};

	data.servers = client.guilds.size;
	data.users = client.users.size;
	data.channels = client.channels.size;
	data.roles = 0;
	data.uptime = Math.floor(client.uptime);
	data.ping = Math.floor(client.ping);
	client.guilds.forEach(x => (data.roles += x.roles.size));

	res.send(JSON.stringify(data));
});

app.use("/guild/:id", (req, res) => {
	var json = {};
	var g = client.guilds.get(req.params.id);
	if (g) {
		g.fetchMembers();

		json.channels = g._sortedChannels().array();
		json.roles = g.roles.array();
		json.members = g.members.array();
	}
	res.send(JSON.stringify(json));
});

module.exports.init = d => {};
