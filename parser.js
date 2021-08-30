module.exports.parseMessage=async function(client, message){
if(!message.content) return;
let substringArray = get_substrings_between(message.content, ":", ":");
    let msg = message.content;
    if(!substringArray.length) return;
    substringArray.forEach(m => {
        let emoji = client.emojis.cache.find(x => x.name === m);
        var replace = `:${m}:`;
        var rexreplace = new RegExp(replace, 'g');
        const replaceInteger = msg.replace(/[0-9]/g, '');
        const emojiInteger = replace.replace(/[0-9]/g, '');
        if (replaceInteger.includes(`<${emojiInteger}>`) || replaceInteger.includes(`<a${emojiInteger}>`)) return;
        if(emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<${replace}${emoji.id}>`) && !msg.includes(`<a${replace}${emoji.id}>`)) {
          msg = msg.replace(rexreplace, emoji.toString());
        };
    })
    if(msg === message.content) return;
    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === "Webhook Emojis");
    if(!webhook) {
        webhook = await message.channel.createWebhook(`Webhook Emojis`, {
            avatar: client.user.displayAvatarURL({dynamic: true})
        });
    }
    await webhook.edit({
        name: message.member.nickname ? message.member.nickname : message.author.username,
        avatar: message.author.displayAvatarURL({dynamic: true})
    })
    message.delete().catch(console.error)
    webhook.send({content:msg}).catch(console.error);
    await webhook.edit({
        name: `Webhook Emojis`,
        avatar: client.user.displayAvatarURL({dynamic:true})
    })
};

function get_substrings_between(str, startDelimiter, endDelimiter) {
    var contents = [];
    var startDelimiterLength = startDelimiter.length;
    var endDelimiterLength = endDelimiter.length;
    var startFrom = contentStart = contentEnd = 0;
    while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
      contentStart += startDelimiterLength;
      contentEnd = strpos(str, endDelimiter, contentStart);
      if (false === contentEnd) {
        break;
      }
      contents.push(str.substr(contentStart, contentEnd - contentStart));
      startFrom = contentEnd + endDelimiterLength;
    }
    return contents;
  }

  function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
  };
