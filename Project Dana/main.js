const token = "NTQ3ODA4NzUxNzA5NTg1NDEx.D0_uaA._gKTQLv2i0RPr6RiJWdJf_PdIVs";
const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const Prefix = "-";
const voc = require("./voc.json");
const jsonfile = require("jsonfile");

function saveVoc() {
	jsonfile
		.writeFile("voc.json", voc)
		.then(res => {
			console.log("Write complete");
		})
		.catch(error => console.error(error));
}
//feedback if online
client.on("ready", async () => {
	console.log(`${client.user.username} is online`);
	console.log(`prefix: ${Prefix}`);
	client.user.setActivity(`${Prefix} | Test Bot`, { type: "WATCHING" });
});

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm")
		return message.channel.send(
			"Die Befehle dieses Bots sind nicht für Privatnachrichten ausgelegt"
		);

	let prefix = Prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	// if(cmd === `${prefix}voc`){
	// 	let length = voc.voc.length;
	// 	let Num = Math.round(Math.random() * length);

	// 	let voca = voc.voc[Num].toString();
	// 	let voca1 = voca.split(":");
	// 	let argss = voca1

	// 	//add
	// 	if(args[0] === `add`){
	// 		if (!message.author.id === `417699816836169728`) return message.channel.send("Du darfst das nicht, wenden dich an NaCl-y")
	// 		let content = message.content.slice(8)
	// 		voc.voc.push(content);
	// 		saveVoc();
	// 		return message.channel.send("``" + content + "`` zu Vocabeln hinzugefügt!");
	// 	};

	// 	//all
	// 	if(args[0] === `all`){
	// 		return message.channel.send(voc.voc);
	// 	};

	// 	//help
	// 	if(args[0] === `help`){
	// 		let hEmbed = new Discord.RichEmbed()

	// 			.setDescription("Voc-Help")
	// 			.addField("!voc all", "Zeigt alle Vokabeln")
	// 			.addField("!voc", "Zeigt eine Zufällige Vokabel, Perfekt zum lernen!")
	// 			.addField("!voc add", "Fügt eine Vokabel hinzu")

	// 		return message.channel.send(hEmbed);
	// 	};

	// 	let embed = new Discord.RichEmbed()

	// 		.setColor("#2c8efc")
	// 		.setDescription("Vocabel Trainer")
	// 		.addField("🇩🇪 Deutsch:", argss[0])
	// 		.addField("🇫🇷 Französisch:", argss[1])
	// 		.setTimestamp();

	// 	return message.channel.send(embed);
	// };

	// if (cmd === `${prefix}`) {
	// 	if (!args[0])
	// 		return message
	// 			.reply("Bitte gib eine Stelle für deine Bewerbung an.")
	// 			.then(x => x.delete(5000));
	// 	message.member.send("Danke für deine Bewerbung als " + args[0]);
	// 	let Channel = message.guild.channel.find(`name`,"bewerbungen")
	// 	// Channel.
	// 	message.channel.send(
	// 		"User: " + message.member + " hat sich als " + args[0] + " beworben"
	// 	);
	// }

	if(cmd === `${prefix}await`){
		message.channel.send(
			new Discord.RichEmbed()
		)
	}
});
client.login(token);
