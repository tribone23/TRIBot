import { ipaddr } from "./commands/ipaddr.js";

export default async function (sock, message) {
  const senderNumber = message.key.remoteJid;
  const textMessage =
    message.message.conversation ||
    (message.message.extendedTextMessage &&
      message.message.extendedTextMessage.text) ||
    (imageMessage && imageMessage.caption) ||
    (videoMessage && videoMessage.caption);

  const reply = async (text) => {
    await sock.sendMessage(senderNumber, { text }, { quoted: message });
  };

  let prefix = /^[\\/!#.]/gi.test(textMessage)
    ? textMessage.match(/^[\\/!#.]/gi)
    : "/";
  const firstmess = textMessage.startsWith(prefix);
  let pesan = textMessage
    .replace(prefix, "")
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();
  if (firstmess) {
    switch (pesan) {
      case "oii":
        {
          reply("oii");
        }
        break;
      case "pagi":
        reply("pagi jugaa");
        break;
    }
  }
  if (textMessage == "hola") {
    await reply("haloo");
  }

  if (textMessage == "ip") {
    ipaddr(sock, message, senderNumber);
  }
}
