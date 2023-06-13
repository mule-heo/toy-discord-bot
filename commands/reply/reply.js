const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("reply").setDescription("normal reply"),

  async execute(interaction) {
    await interaction.reply("Hi, there!");
  },
};
