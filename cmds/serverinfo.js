/* serverinfo.js */
/* Remember to edit the JSON file before editing the code in here! */
const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send('Checking my database...');
	const serverInfo = require('../serverinfo.json');
	let output = '';

	if (!args[0]) {
		msg.delete();
		return message.reply(
			`please include a game server you wish to get the details for! Or type 'all' for all of them.`
		);
		/* Edit your games with reg ex here */
	} else if (args[0] === 'minecraft' || args[0] === 'mc') {
		serverInfo.servers.forEach(x => {
							/* Edit me */
			if (x.Server === 'Minecraft'){
				output += `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== ''){
					output += ':' + x.Port + '\n';
				} 
			}
		});
		/* Edit your games with reg ex here */
	} else if (args[0] === 'l4d2' || args[0] === 'left4dead2') {
		serverInfo.servers.forEach(x => {
							/* Edit me */
			if (x.Server === 'L4D2'){
				output += `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== ''){
					output += ':' + x.Port + '\n';
				} 
			}
		});
		/* Edit your games with reg ex here */
	} else if (args[0] === 'csgo' || args[0] === 'counterstrike' || args[0] === 'cs') {
		serverInfo.servers.forEach(x => {
							/* Edit me */
			if (x.Server === 'CSGO'){
				output += `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== ''){
					output += ':' + x.Port + '\n';
				} 
			}
		});
	} else if ('all') {
		serverInfo.servers.forEach((x) => {
			output += `**${x.Server}**:` + '\n' + x.IP;
			if (x.Port !== ''){
				output += ':' + x.Port + '\n';
			} 
		});
	} else {
		msg.delete();
		return message.reply(`game server doesn't exist or invalid game!`);
	}

	function createdDate(file) {
		const { birthtime } = fs.statSync(file);
		return birthtime;
	}

	var gameTitle = args[0].toUpperCase();
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setTitle(`${gameTitle} SERVER INFO:`)
		.setDescription(output)
		.setFooter(
			`*Information last updated ${createdDate('serverinfo.json')
				.toISOString()
				.replace('-', '/')
				.split('T')[0]
				.replace('-', '/')}`
		);
	message.channel.send(embed).catch((error) => message.reply(`${error}`));
	msg.delete();
};

module.exports.help = {
	name: 'serverinfo',
	usage: 'serverinfo <game> [all]',
};
