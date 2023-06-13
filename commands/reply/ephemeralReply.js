const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ephemeral-reply")
    .setDescription("reply message that only you can see."),

  async execute(interaction) {
    await interaction.reply({ content: "Secret!", ephemeral: true });
  },
};
