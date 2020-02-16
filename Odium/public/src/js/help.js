function displayHelp() {
	$("#help > h3").html("Help - " + guild.name);
	getStats();
	$("#exampleInputEmail1").emojioneArea({
		filtersPosition: "bottom",
		tones: false,
		shortnames: true,
		autocomplete: true,
		textcomplete: {
			maxCount: 20,
			placement: "absleft"
		}
	});
}

function getStats() {
	$.get({
		url: "/api/stats/",
		success: function(body) {
			displayStats(JSON.parse(body));
		}
	});
}

function displayStats(stats) {
	var text = "<table><thead><tr><td></td><td></td></tr></thead><tbody>";

	text += "<tr><td>Servers:</td><td>" + stats.servers + "</td></tr>";
	text += "<tr><td>Channels: </td><td>" + stats.channels + "</td></tr>";
	text += "<tr><td>Users: </td><td>" + stats.users + "</td></tr>";
	text += "<tr><td>Roles: </td><td>" + stats.roles + "</td></tr>";
	text += "<tr><td>Uptime: </td><td>" + msToTime(stats.uptime) + "</td></tr>";
	text += "<tr><td>Ping: </td><td>" + stats.ping + "ms</td></tr>";

	text += "</tbody></table>";

	$("#helpStats").html(text);
}

function msToTime(milli) {
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	var hours = Math.floor((milli / (60 * 1000 * 60)) % 60);
	var days = Math.floor((milli / (60 * 1000 * 60 * 24)) % 24);

	return days + "d " + hours + ":" + minutes + ":" + seconds;
}
