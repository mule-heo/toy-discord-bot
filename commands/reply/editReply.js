const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edit-reply")
    .setDescription("the answer will be editted in a while"),

  async execute(interaction) {
    await interaction.reply("Hey!");
    await wait(3000);
    await interaction.editReply("...");
  },
};
