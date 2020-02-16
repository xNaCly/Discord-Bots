var loggedin = false;
var user;
var token;
var guilds;
var transition = 200;
var socket = io(location.origin);

$(document).ready(() => {
	token = Cookies.get("token");
	if (token) {
		var d = {
			token: JSON.parse(atob(token))
		};
		token = d.token;
		$("#load").show();
		gotLogin(d);
	}

	$(".selectpicker").selectpicker({
		liveSearch: true,
		style: "btn-outline-primary"
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$("#back-to-top").fadeIn();
		} else {
			$("#back-to-top").fadeOut();
		}
	});

	$(".dashboard #wrapper .nav#sidebarTabs a").on("click", e => {
		$(e.currentTarget)
			.siblings()
			.removeClass("active");
	});

	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	$("#back-to-top").click(function() {
		$("#back-to-top").tooltip("hide");
		$("body,html").animate(
			{
				scrollTop: 0
			},
			800
		);
		return false;
	});
});

var win;
var wininvite;

function doLogin(e) {
	if (
		$(e)
			.siblings()
			.eq(0)
			.hasClass("active")
	) {
		return;
	} else {
		$(e)
			.siblings()
			.eq(0)
			.attr("style", "display: none !important");
	}

	$("#load").show();
	win = window.open(
		"https://discordapp.com/api/oauth2/authorize?client_id=569201129691283497&redirect_uri=http://flam3rboy.ddns.net/api/authorize&response_type=code&scope=identify guilds&state=" +
			socket.id,
		"windowOpenTab",
		"height=900,width=600"
	);

	var popupTick = setInterval(function() {
		if (win.closed) {
			clearInterval(popupTick);
			gotLogin({ error: "closed" });
		}
	}, 500);
}

function invite(id) {
	wininvite = window.open(
		"https://discordapp.com/oauth2/authorize?client_id=569201129691283497&permissions=8&redirect_uri=http://flam3rboy.ddns.net/api/bot&scope=bot&guild_id=" +
			id +
			"&response_type=code&state=" +
			socket.id,
		"windowOpenTab",
		"height=900,width=600"
	);
}

socket.on("data", data => {
	gotLogin(data);
});

function gotLogin(data) {
	if (data.error) {
		console.log(data.error + data.error_description);
		try {
			win.close();
		} catch (e) {}
		$("#load").hide(transition);
	} else {
		Cookies.set("token", btoa(JSON.stringify(data.token)));
		token = data.token;
		refresh();
	}
}

function finishUserLoad() {
	try {
		win.close();
	} catch (e) {}

	$('[data-toggle="tooltip"]').tooltip();

	$(".dashboard").show(transition);
	$("main").hide(transition);
	$("footer").hide(transition);
}

function refresh(hide, e) {
	if (!hide) {
		$("#load").show(transition);
	}

	try {
		$(e).addClass("fa-spin");
	} catch (e) {}

	$("#load p").html("Refreshing ...");

	$.get({
		url: "https://discordapp.com/api/users/@me",
		beforeSend: function(request) {
			request.setRequestHeader(
				"Authorization",
				token.token_type + " " + token.access_token
			);
		},
		success: function(u) {
			user = u;
			$("#homeLogin").html("Refresh");
			$("#homeLogin").attr("onclick", "refresh()");
			$("#accountDropdownButton").html(
				"<img class='userImg' src='https://cdn.discordapp.com/avatars/" +
					u.id +
					"/" +
					u.avatar +
					"'>&nbsp;" +
					u.username
			);
			$("#accountDropdown").show(transition);
			$("#accountDropdown").removeClass("show");
			$("#accountDropdown").addClass("active");
			finishUserLoad();

			window.scrollTo(0, 0);
			$("#load p").html("Hello " + u.username + "#" + u.discriminator);
		}
	});

	$.get({
		url: "https://discordapp.com/api/users/@me/guilds",
		beforeSend: function(request) {
			request.setRequestHeader(
				"Authorization",
				token.token_type + " " + token.access_token
			);
		},
		success: function(g) {
			guilds = g;
			$("#load").hide();

			displayGuilds();
			try {
				$(e).removeClass("fa-spin");
			} catch (e) {}
		}
	});
}

function displayGuilds() {
	var text = "";

	if (guilds.filter(x => x.owner || (x.permissions & 0x8) != 0).length <= 0) {
		text += "<h5>You do not have a server where you are admin</h5>";
	}

	guilds
		.filter(x => x.owner || (x.permissions & 0x8) != 0)
		.forEach(g => {
			if (g.icon) {
				text +=
					"<img id='" +
					g.id +
					"' onclick='selectGuild(this)' data-placement='bottom' data-toggle='tooltip' title='" +
					g.name +
					"' class='guild pointer' src='https://cdn.discordapp.com/icons/" +
					g.id +
					"/" +
					g.icon +
					"'><br>";
			} else {
				var initals = "";
				g.name.split(" ").forEach(x => (initals += x.slice(0, 1)));
				text +=
					"<span id='" +
					g.id +
					"' onclick='selectGuild(this)' data-placement='bottom' data-toggle='tooltip' title='" +
					g.name +
					"' class='guild pointer'>" +
					initals +
					"</span>";
			}
		});

	$("#guildList").html(text);

	var url_string = window.location.href;
	var url = new URL(url_string);
	var g = url.searchParams.get("guild");

	if (g) {
		guild.id = g;
	}
	if (guild.id) {
		selectGuild({ id: guild.id });
	}
}

var guild = {};
var testGuildInvite = 0;

function selectGuild(g) {
	g = g.id;
	window.history.replaceState(null, null, "?guild=" + g);
	$.get({
		url: location.origin + "/api/guild/" + g,
		error: function(e,body){
			$(".dashboard").prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error Loading Server!</strong><br>Please contact the <a target="_BLANK" href="https://discord.gg/J4CN9Wv">support!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
		},
		success: function(body) {
			body = JSON.parse(body);

			if (Object.keys(body).length <= 0) {
				if (testGuildInvite <= 0) {
					testGuildInvite++;
					invite(g);
					var popupTick = setInterval(
						function(h) {
							if (wininvite.closed) {
								clearInterval(popupTick);
								selectGuild({ id: h });
							}
						},
						500,
						g
					);
				} else {
					$(".dashboard").prepend(
						'<div class="alert alert-danger alert-dismissible fade show">Couldn\'t add bot to server<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button></div>'
					);
					testGuildInvite = 0;
				}
			} else {
				testGuildInvite = 0;
				$("#guildList").hide(transition);
				$("#wrapper").css("display", "flex");

				$.get({
					url: "/api/guild/" + g + "/config",
					success: function(config) {
						config = JSON.parse(config);
						guild = body;
						guild.name = guilds.find(
							x => x.id == "549258965389803550"
						).name;
						guild.config = config;
						guild.id = g;
						displaySettings(guild, body);
						displayCommands(guild, body);
						displayHelp();
					}
				});
			}
		}
	});
}

function logout() {
	Cookies.remove("token");
	location.reload();
}

function guildList() {
	window.history.replaceState({}, document.title, "/");
	if (user) {
		$(".dashboard").show(transition);
		$("main").hide(transition);
		$("footer").hide(transition);
		$("#guildList").show(transition);
		$("#wrapper").hide(transition);
	} else {
		doLogin();
	}
}

function home() {
	$(".dashboard").hide(transition);
	$("main").show(transition);
	$("footer").show(transition);
}

function replaceTag($element, newTagName) {
	// Identify opening and closing tag
	var oldTagName = $element[0].nodeName,
		elementString = $element[0].outerHTML,
		openingRegex = new RegExp("^(<" + oldTagName + " )", "i"),
		openingTag = elementString.match(openingRegex),
		closingRegex = new RegExp("(</" + oldTagName + ">)$", "i"),
		closingTag = elementString.match(closingRegex);

	if (openingTag && closingTag && newTagName) {
		// Remove opening tag
		elementString = elementString.slice(openingTag[0].length);
		// Remove closing tag
		elementString = elementString.slice(0, -closingTag[0].length);
		// Add new tags
		elementString =
			"<" + newTagName + " " + elementString + "</" + newTagName + ">";
	}

	return $(elementString);
}

(function($) {
	$.fn.extend({
		bs_alert: function(message, title) {
			var cls = "alert-danger";
			var html =
				'<div class="alert ' +
				cls +
				' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
			if (typeof title !== "undefined" && title !== "") {
				html += "<h4>" + title + "</h4>";
			}
			html += "<span>" + message + "</span></div>";
			$(this).html(html);
		},
		bs_warning: function(message, title) {
			var cls = "alert-warning";
			var html =
				'<div class="alert ' +
				cls +
				' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
			if (typeof title !== "undefined" && title !== "") {
				html += "<h4>" + title + "</h4>";
			}
			html += "<span>" + message + "</span></div>";
			$(this).html(html);
		},
		bs_info: function(message, title) {
			var cls = "alert-info";
			var html =
				'<div class="alert ' +
				cls +
				' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
			if (typeof title !== "undefined" && title !== "") {
				html += "<h4>" + title + "</h4>";
			}
			html += "<span>" + message + "</span></div>";
			$(this).html(html);
		},
		bs_success: function(message, title) {
			var cls = "alert-success";
			var html =
				'<div class="alert ' +
				cls +
				' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
			if (typeof title !== "undefined" && title !== "") {
				html += "<h4>" + title + "</h4>";
			}
			html += "<span>" + message + "</span></div>";
			$(this).html(html);
		}
	});
})(jQuery);
