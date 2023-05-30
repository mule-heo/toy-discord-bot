const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("pingping2"),

  async execute(interaction) {
    await interaction.reply("pong");
  },
};
