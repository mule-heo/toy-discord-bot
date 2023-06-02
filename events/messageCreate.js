const { Events } = require("discord.js");
require("dotenv").config();

// 새로운 메시지가 있을 때 실행됩니다.
let repeat = false;
module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    // echo
    if (!message.author.bot) {
      if (message.content === process.env.START_ECHO_MAGIC_WORD) {
        repeat = true;
        return;
      } else if (message.content === process.env.STOP_ECHO_MAGIC_WORD) {
        repeat = false;
        return;
      }
      if (repeat) {
        message.reply(message.content);
      }
    }
  },
};
