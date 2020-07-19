/* mute.js */
module.exports.run = async (Client, message, args) => {
  let usr = message.mentions.users.first();
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply(
      "nice try. You need Administrator rights to do that. :monkey:"
    );
  }
  if (!usr) {
    return message.reply("please specify a user to mute!");
  }
  let role = message.guild.roles.find(
    (role) => role.name == "Get Muted Nerd HA"
  ); // <-- Change me
  await Member.addRole(role);
  message.channel
    .send(`${usr} has been muted lol.`)
    .catch((error) => message.reply(`${error}`));
};

module.exports.help = {
  name: "mute",
  usage: "mute <user>",
};
