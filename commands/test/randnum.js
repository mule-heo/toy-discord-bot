const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 3,
  data: new SlashCommandBuilder()
    .setName("randnum")
    .setDescription("1부터 100 사이의 임의의 자연수를 반환합니다."),

  async execute(interaction) {
    await interaction.reply(`${Math.floor(Math.random() * 100) + 1}`);
  },
};
