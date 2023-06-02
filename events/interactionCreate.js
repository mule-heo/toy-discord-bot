const { Events, Collection } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`${interaction.commandName}: 일치하는 명령어가 없습니다.`);
      return;
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3; // 쿨다운 기본값
    const cooldownTime = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownTime;

      // <t:${expiredTimestamp}:R>
      // const expiredTimestamp = Math.round(expirationTime / 1000);
      if (now < expirationTime) {
        const timeDelta = Math.ceil((expirationTime - now) / 1000);
        await interaction.reply({
          content: `기다려주세요. \`${command.data.name}\` 요청은 ${timeDelta}초 후에 다시 보낼 수 있습니다.`,
          ephemeral: true,
        });
        await wait(timeDelta * 1000);
        await interaction.deleteReply();
        return;
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownTime);

    if (interaction.commandName === "ping") {
      await interaction.deferReply();
      await wait(3000);
      await interaction.editReply("Pong!");
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "명령어 실행중 오류가 발생하였습니다.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "명령어 실행중 오류가 발생하였습니다.",
          ephemeral: true,
        });
      }
    }
  },
};
