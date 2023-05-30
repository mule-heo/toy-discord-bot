const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

// Client 인스턴스를 생성합니다.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.cooldowns = new Collection();
client.commands = new Collection();

// commands 폴더 명령어 추가
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath, "utf8");

commandFolders.forEach((folder) => {
  const commandsPath = path.join(foldersPath, folder);
  const commandsFiles = fs
    .readdirSync(commandsPath, "utf8")
    .filter((file) => file.endsWith(".js"));

  commandsFiles.forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`${filePath}에 data 또는 execute 속성이 누락되어 있습니다.`);
    }
  });
});

// events 폴더 이벤트 추가
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// 클라이언트 토큰을 가지고 디스코드에 로그인합니다.
client.login(process.env.TOKEN);
