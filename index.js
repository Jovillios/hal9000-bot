const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === 'dm') return;
    let prefix = '!';
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.splice(1);
    if(cmd === `${prefix}kick`)
    {
        let kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if(!kUser) return msg.channel.send("Membre non trouvé!");
        let kReason = args.join(" ").slice(22);
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`I'm sorry ${msg.author.username}, I'm afraid I can't do that`);
        if(kUser.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(`I'm sorry ${msg.author.username}, I'm afraid I can't do that`);
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor('#FF0000')
        .addField("Membre kicked", `${kUser} avec l'ID ${kUser.id}`)
        .addField("Kicked npar", `<@${msg.author.id}> avec l'ID ${msg.author.id}`)
        .addField("Kicked dans", msg.channel)
        .addField("Temps", msg.createdAt)
        .addField("Raison", kReason);

        let kickChannel = msg.guild.channels.find('name', 'incidents');
        if(!kickChannel) return msg.channel.send("Salon Incidents non trouvé");

        msg.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);

        return;
    }
    
})


bot.on('ready', function(){
    console.log("Ready");
})

bot.login(process.env.BOT_TOKEN);
