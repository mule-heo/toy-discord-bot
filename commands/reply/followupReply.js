const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("followup-reply")
    .setDescription("reply and then reply again."),

  async execute(interaction) {
    await interaction.reply("Hi, there!");
    await interaction.followUp("I am banana.");
  },
};
