const discord = require('discord.js');
const db = require('wio.db');
const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    let channel = message.mentions.channels.first();

    
	if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new discord.MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
            .setColor("BLUE")
            .setFooter( "Narcos Code Ayarlamalı Kayıt Botu", client.user.avatarURL())
        message.channel.send({embed})

}

    if (!args[0]) return message.channel.send(new discord.MessageEmbed()                                          
    .setTitle("Hata!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Kullanım:
     **${prefix}hglog ayarla #kayıtlog**
     **${prefix}hglog sıfırla** `)
    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!channel) return message.channel.send("**Lütfen bir Kanal etiketleyip tekrar deneyin.**")
     db.set(`klog_${message.guild.id}`, channel.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Log Kanalı ${channel} Olarak Ayarlandı`)
    .setColor("BLUE"))


}


if(args[0] == "sıfırla") {


    
    if(!db.has(`klog_${message.guild.id}`)) return message.channel.send("HG Kanalı ayarlanmamış ki sıfırlıyayım")
    db.delete(`klog_${message.guild.id}`)
  }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hglog',
  description: 'Hoşgeldin Log ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};