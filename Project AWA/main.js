const Discord = require('discord.js');
const { TOKEN } = require('./config');
const PREFIX = "-";
const client = new Discord.Client({ disableEveryone : true });


client.on('ready', async => {
    console.log("ready")
})


client.on('message', async msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;;
    
    //test
    if (msg.content.startsWith(`${PREFIX}hi`)){
        msg.channel.send(`HI, ${msg.member}`);
    };

    //bot test
    if(msg.content === `${PREFIX}bot`){
        let botembed = new Discord.RichEmbed()

        .setDescription("Information about the Salty bot")
        .setColor("#00ff00")
        .addField("Bot Name:", client.user.username)
        .addField("Erstellt am:", client.user.createdAt)
        .addField("Programmiersprache:",`Js/discord.js`)
        .addField("Owner:",`<@417699816836169728>`)
        .addField("Git-Hub-link:","https://github.com/NaCl-y1/Phoenix")
        .setFooter("Bei einem Bug:", `sendet mir ne dm`);
        
        return msg.channel.send(botembed);
    }

    if(msg.content === `${PREFIX}dsb`){
        // let Attach = new Discord.Attachment("./dsb_29.08.2019.html");
        let Attach = new Discord.RichEmbed()
        .url("./dsb_29.08.2019.html")
        msg.channel.send(Attach)
    }
});
client.login(TOKEN);
