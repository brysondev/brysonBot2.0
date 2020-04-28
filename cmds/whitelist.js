const Discord = require('discord.js');
const { exec } = require('child_process');
/* 

This will only work if you have a screen running for your minecraft server. 
And you run both the server and the bot on the same hardware. 

*/
module.exports.run = async (Client, message, args) => {
	let type = args[0];
	let usr = args[1];
	if (type === 'add') {
		if (!usr) {
			return message.reply('please specify a Minecraft username!');
		}
		let msg = await message.channel.send(`Adding ${usr} to the whitelist...`);
		/* The most scuffed use of exec in my entire life */
		exec(
			`tempfile=$(mktemp) && echo 'whitelist add ${usr}' | cat > $tempfile && screen -X readbuf $tempfile && screen -X paste . && rm -f $tempfile`,
			(error, stdout, stderr) => {
				if (error) {
					return message.channel.send(`Failed! Here's what we know: ${error}`);
				}
				if (stderr) {
					return message.channel.send(`stderr! ${stderr}`);
				}
			}
		);
		const embed = new Discord.RichEmbed()
			.setColor(0x5d2079)
			.setTitle('Success!')
			.setDescription(`${usr} was whitelisted on the minecraft server!`);
		message.channel.send(embed).catch((error) => message.reply(`${error}`));
		msg.delete();
	} else if (type === 'remove') {
		if (!usr) {
			return message.reply('please specify a Minecraft username!');
		}
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply(
				'only an admin of this discord can remove people from whitelist!'
			);
		}
		if (!args[1]) {
			return message.reply('please specify a Minecraft username!');
		}
		let msg = await message.channel.send(
			`Removing ${usr} from the whitelist...`
		);
		exec(
			`tempfile=$(mktemp) && echo 'whitelist remove ${usr}' | cat > $tempfile && screen -X readbuf $tempfile && screen -X paste . && rm -f $tempfile`,
			(error, stdout, stderr) => {
				if (error) {
					return message.channel.send(`Failed! Here's what we know: ${error}`);
				}
				if (stderr) {
					return message.channel.send(`stderr! ${stderr}`);
				}
			}
		);
		const embed = new Discord.RichEmbed()
			.setColor(0x5d2079)
			.setTitle('Success!')
			.setDescription(
				`${usr} was removed from the whitelist on the minecraft server!`
			);
		message.channel.send(embed).catch((error) => message.reply(`${error}`));
		msg.delete();
	} else if (type === 'list') {
    /* 
    Change the directory of your minecraft server.
    Am very proud of this tho. Works like a charm :^)
    */
		exec(
			`tempfile=$(mktemp) && echo 'whitelist list' | cat > $tempfile && screen -X readbuf $tempfile && screen -X paste . && rm -f $tempfile && tail -1 /home/bryson/minecraftserver/logs/latest.log | cut -d ":" -f 5 | tr , '\n' | sort`,
			(error, stdout, stderr) => {
				if (error) {
					return message.channel.send(`Failed! Here's what we know: ${error}`);
				}
				if (stderr) {
					return message.channel.send(`stderr! ${stderr}`);
				}
				if (stdout) {
					const embed = new Discord.RichEmbed()
						.setColor(0x5d2079)
						.setTitle('Whitelist:')
            .setDescription(`${stdout}`);
            message.channel.send(embed).catch((error) => message.reply(`${error}`));
				}
			}
		);
	} else {
		return message.reply('Failed! Talk to the guy running the bot!');
	}
};

module.exports.help = {
	name: 'whitelist',
	usage: 'whitelist add/remove/list <minecraft username>',
};