const { Events } = require("discord.js");

// 클라이언트가 준비되었을 때, 한 번만 실행되는 코드입니다.

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
