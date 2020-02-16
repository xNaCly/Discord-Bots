module.exports.init = async function() {
	client.on("voiceStateUpdate", (oldMember, newMember) => {
		var conf = getConfig(newMember.guild);
		if (!conf) {
			conf = getConfig(oldMember.guild);
		}

		if (!conf) {
			return false;
		}

		if (conf.extra["channelCreation"].active) {
			var channelprefix = conf.extra["channelCreation"].prefix;

			var newUserChannel = newMember.voiceChannel;
			var oldUserChannel = oldMember.voiceChannel;

			function cloneChannel(channel) {
				channel.setParent(newUserChannel.parent).then(() => {
					channel.setPosition(newUserChannel.position + 1);
					channel
						.lockPermissions()
						.then(x =>
							console.log(
								"Successfully synchronized permissions with parent channel"
							)
						)
						.catch(console.error);
				});
				channel.setUserLimit(newUserChannel.userLimit);
			}

			if (
				(oldUserChannel == undefined ||
					(newUserChannel !== undefined &&
						newUserChannel.id != oldUserChannel.id)) &&
				newUserChannel.name.indexOf("[") == -1 &&
				newUserChannel.name.indexOf(channelprefix) != -1
			) {
				newUserChannel.guild
					.createChannel(
						newUserChannel.name +
							" [" +
							newMember.user.username +
							"]",
						"voice"
					)
					.then(channel => {
						newMember.setVoiceChannel(channel);
						cloneChannel(channel);
					});
			}

			if (
				newUserChannel == undefined ||
				(oldUserChannel != undefined &&
					newUserChannel.id != oldUserChannel.id)
			) {
				if (oldUserChannel.name.indexOf(channelprefix) != -1) {
					if (
						oldUserChannel.members.size <= 0 &&
						oldUserChannel.name.indexOf("[") != -1
					) {
						oldUserChannel.delete();
					}
				}
			}
		}
	});
};

module.exports.settings = {
	prefix: "➤",
	active: true
};
