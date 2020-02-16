function displayCommands() {
	$("#sayRoleList").html("");
	$("#commands > h3").html("Commands - " + guild.name);
	rr();
}

function say() {
	var channel = $("#sayChannels")
		.find("select")
		.val();

	var roles = [];

	$("#sayRoleList")
		.children()
		.each((i, x) => {
			roles.push(
				$(x)
					.find("select")
					.val()
			);
		});

	$.get({
		url: "/api/guild/" + guild.id + "/say/" + channel + "/" + JSON.stringify(roles) + "/" + Base64.encode($("#sayText").val()),
		success: function(body) {
			console.log(body);
			if (body == "true") {
				$("#statusSend").bs_success("Successfully send message!");
			} else {
				$("#statusSend").bs_alert("There was an error sending you message!");
			}
		},
		error: function() {
			$("#statusSend").bs_alert("There was an error sending you message!");
		}
	});
}

function removeSayRole() {
	$("#sayRoleList")
		.children()
		.last()
		.remove();
}

function addSayRole() {
	$("#sayRoleList").append("<select class='roles col-5 m-2 selectpicker'>" + generateRoles(guild.roles) + "</select>");
	$("#sayRoleList .selectpicker")
		.last()
		.selectpicker({
			liveSearch: true,
			style: "btn-outline-primary"
		});
}

function generateRoles(roles) {
	var text = "";
	roles = roles
		.sort((a, b) => {
			if (a.position > b.position) {
				return -1;
			} else if (a.position < b.position) {
				return 1;
			} else {
				return 0;
			}
		})
		.forEach(x => {
			text += "<option id='" + x.id + "' value='" + x.id + "'>" + x.name + "</option>";
		});
	return text;
}

function rr() {
	$("#rrChannels select").on("change", function(e) {
		var val = $(e.currentTarget).val();
		$.get({
			url: "/api/guild/" + guild.id + "/channel/" + val + "/messages",
			success: function(msg) {
				msg = JSON.parse(msg);
				var text = "";
				msg.reverse().forEach(m => {
					var content = m.content.replace(/\n/g, "<br>").replace(/[~*_`]/g, "");

					if (m.attachments.length > 0) {
						content += "<br><img src='" + m.attachments[0] + "'>";
					}

					if (m.reactions.length > 0) {
						content += "<br><br><div class='reactions'>";
						m.reactions.forEach(r => {
							if (r.url) {
								r.emoji = "<img src='" + r.url + "' class='emoji'>";
							}
							content += "<span onclick='handleRR(this)' class='pointer reaction badge-secondary rounded p-1'>" + r.emoji + " " + r.count + "</span>";
						});
						content += "</div>";
					}

					var date = moment(new Date(parseInt(m.createdTimestamp)), "YYYYMMDD").fromNow();
					text += "<div class='msg'>";
					text += "<div class='img'><img src='" + m.author.avatar + "'></div>";
					text += "<div class='comment'>";
					text += "<div class='author'>";
					text += "<span class='user'>" + m.author.tag + "</span>&nbsp;&nbsp;";
					text += "<span style='font-weight:100'>" + date + "</span>";
					text += "</div>";
					text += "<div class='content'>";
					text += content;
					text += "</div>";
					text += "</div>";
					text += "</div>";
					text += "</div>";
				});
				$("#rrMessages").html(text);
				$("#rrMessages").show();
				console.log(msg, text);
			}
		});
	});
}

function handleRR(e) {
	$(e).toggleClass("badge-secondary");
	$(e).toggleClass("badge-primary");
	$("#addRR").modal("show");
}
