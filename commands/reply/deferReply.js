const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("defer-reply")
    .setDescription("deferred reply"),

  async execute(interaction) {
    await interaction.deferReply("");
    await wait(5000);
    await interaction.editReply("I'm sorry. I'm late.");
  },
};
