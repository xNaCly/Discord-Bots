const token = "";
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const Prefix = "/";
const Twitter ="";

//client id: 543896273028382780
//token: 

//adding link: https://discordapp.com/oauth2/authorize?client_id=543896273028382780&scope=bot&permissions=8



//feedback if online
bot.on("ready", async() => {
    console.log(`${bot.user.username} is online`);
    console.log(`prefix: ${Prefix}`);
    bot.user.setActivity(`${Prefix}help | v0.4 Alpha`, {type: "WATCHING"})
    //old-->//bot.user.setGame("v0.0.1-Alpha");
    //not working-->//bot.user.setNickname("MSC Bot | by NaCl-y")
});

bot.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = Prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);



    //serverinfo
    if(cmd === `${prefix}serverinfo`){
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        
        .setDescription("Server Info")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("You Joined at",message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount)
        .setColor("#0099cc")
        .addField(".", `Made by : ${Twitter}`);

        return message.channel.send(serverembed);
    }
    
    
    //botinfo
    if(cmd === `${prefix}botinfo`){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()

        .setDescription("Information about the Salty bot")
        .setColor("#0099cc")
        .setThumbnail(bicon)
        .addField("Bot Name:", bot.user.username)
        .addField("Created On:", bot.user.createdAt)
        .addField("Programmiersprache:",`Java/discord.js`)
        .addField("Developer/Owner:",`<@417699816836169728>`)
        .addField("If you found any Bug please contact me", `saltybot12@gmail.com`)
        .addField("Twitter:",`${Twitter}`);
        
        return message.channel.send(botembed);
    }
    
    //donate
    if(cmd === `${prefix}donate`){
        let donembed = new Discord.RichEmbed()

        .setDescription("Support me:")
        .setColor("#0099cc")
        .addField("PayPal", `matteogropp12@gmail.com`)
        .addField(".", `Made by : ${Twitter}`);
        
        return message.channel.send(donembed);
    }
    
    //report
    if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn´t find user.");
        let reason = args.join(" ").slice(22);
        
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("~Report~")
        .setColor("#ff6600")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported by",`${message.author} with ID ${message.author.id}`)
        .addField("channel", message.channel)
        .addField("time", message.createdAt)
        .addField("Reason", reason)
        .addField(".", `Made by : ${Twitter}`);
        
        let reportschannel = message.guild.channels.find(`name`, "report");
        if(!reportschannel) return message.channel.send("couldnt find reportschannel please create one!");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
        return;

    }
    
    //kick
    if(cmd === `${prefix}kick`){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Cant find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant do that honey :)");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~kick~")
        .setColor("#ff0000")
        .addField("Kicked User",`${kUser} with ID ${kUser.id}`)
        .addField("Kicked By",`<@${message.author.id}>`)
        .addField("Kicked in",  message.channel)
        .addField("time", message.createdAt)
        .addField("Reason", kReason)
        .addField(".", `Made by : ${Twitter}`);
    
        let kickchannel = message.guild.channels.find(`name`, "report");
        if(!kickchannel) return message.channel.send("cant find reportChannel please create one!");

        message.guild.member(kUser).kick(kReason);
        kickchannel.send(kickEmbed)
    }
    //ban
    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Cant find user");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant do that honey :)");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("~ban~")
        .setColor("#990000")
        .addField("Banned User",`${bUser} with ID ${bUser.id}`)
        .addField("banned By",`<@${message.author.id}>`)
        .addField("banned in",  message.channel)
        .addField("time", message.createdAt)
        .addField("Reason", bReason)
        .addField(".", `Made by : ${Twitter}`);
    
        let banchannel = message.guild.channels.find(`name`, "report");
        if(!banchannel) return message.channel.send("cant find reportChannel please create one!");

        message.guild.member(bUser).ban(bReason);
        banchannel.send(banEmbed)
    }
    
    //clear msg
    if(cmd ===`${prefix}clear`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("nope u cant do that");
        if(!args[0]) return message.channel.send("Please specify the amount of messages to delate!");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Cleared ${args[0]} Messages!`).then(msg => msg.delete(3000));
        });
    }
    
    //help
    if(cmd === `${prefix}help`){
        let boticon = bot.user.displayAvatarURL
        let botembed = new Discord.RichEmbed()
        
        .setDescription("Salt-y Help")
        .setColor("#0099cc")
        .setThumbnail(boticon)
        .addField(`${prefix}help:`,`this side :)`)
        .addField(`${prefix}botinfo:`, `information about the bot`)
        .addField(`${prefix}serverinfo:`, `information about the server`)
        .addField(`${prefix}donate:`,"If you want to support this bot/me")
        .addBlankField()
        .addField("For the following commands you need to be at least mod on this server!",`.`)
        .addField(`${prefix}clear:`, `clears messages | Syntax ${prefix}clear amount of msgs \n EG: ${prefix}clear 15`)
        .addField(`${prefix}report:`, `reports a user | Syntax ${prefix}report @user reason \n EG: ${prefix}report @NaCl-y#4400 spam`)
        .addField(`${prefix}kick:`, `kicks a user | Syntax: ${prefix}kick @user reason \n EG: ${prefix}kick @NaCl-y#4400 spam`)
        .addField(`${prefix}ban:`, `bans a user | Syntax: ${prefix}ban @user reason \n EG: ${prefix}ban @NaCl-y#4400 spam`)
        .addField(".", `Made by : ${Twitter}`);
        
        return message.channel.send(botembed);
    }
});
bot.login(token);