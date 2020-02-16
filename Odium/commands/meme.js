module.exports.run = (msg, args) => {
	console.log("meme started");
	//command

	var reddit = ["dankmemes", "ich_iel"];
	var num = Math.floor(Math.random());
	var subreddit = reddit[num];

	msg.channel.startTyping();
	randomPuppy(subreddit)
		.then(async url => {
			await msg.channel.send(url).then(() => msg.channel.stopTyping());
		})
		.catch(err => console.error(err));
};

module.exports.help = {
	help: "",
	description: "Shows memes from r/dankmemes"
};
