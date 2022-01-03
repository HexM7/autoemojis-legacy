# autoemojis-legacy
This parser was used in the legacy `v3` series of Comio, until it was finally deprecated in the `v4` series due to Discord's terms of use violation.

## Terminology

```js
let substringArray = get_substrings_between(message.content, ":", ":");
let msg = message.content;
if (!substringArray.length) return;

substringArray.forEach(m => {
  let emoji = client.emojis.cache.find(x => x.name === m);
  var replace = `:${m}:`;
  var regReplace = new RegExp(replace, 'g');
  const replaceInteger = msg.replace(/[0-9]/g, '');
  const emojiInteger = replace.replace(/[0-9]/g, '');
  if (replaceInteger.includes(`<${emojiInteger}>`) || replaceInteger.includes(`<a${emojiInteger}>`)) return;
  if(emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<${replace}${emoji.id}>`) && !msg.includes(`<a${replace}${emoji.id}>`)) {
    msg = msg.replace(regReplace, emoji.toString());
  };
});
```
Message content is breaked into chunks having custom emojis or unicode emojis (:), and each chunk is checked if it's a valid custom emoji and the client can access it. A new Regex is built which replaces all the chunks matching the custom emoji.
```js
let webhook = await message.channel.fetchWebhooks();
webhook = webhook.find(x => x.name === "Webhook Emojis");

if (!webhook) {
  webhook = await message.channel.createWebhook(`Webhook Emojis`, {
    avatar: client.user.displayAvatarURL({ dynamic: true })
  });
};

await webhook.edit({
  name: message.member.nickname ? message.member.nickname : message.author.username,
  avatar: message.author.displayAvatarURL({ dynamic: true })
});

message.delete()
  .catch(console.error);
  
webhook.send({ content: msg })
  .catch(console.error);
  
await webhook.edit({
  name: `Webhook Emojis`,
  avatar: client.user.displayAvatarURL({ dynamic: true })
});
```
A webhook named as `Webhook Emojis` is resolved, then its name and avatar is replaced by the message author's name and avatar to replicate the author. Finally the original message is deleted and a new webhook message is sent in the message's channel having the custom emojis.
