//controller, adapter
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import notion from "../notion/api.js";
import { ogScraper } from "../open-graph/og.js";
import tagger from "../open-graph/og-tagging.js"


const data = new SlashCommandBuilder()
  .setName("notion")
  .setDescription("노션 데이터베이스에 자료를 추가")
  .addStringOption((option) =>
    option
      .setName("url")
      .setDescription("추가하려는 자료의 URL")
      .setRequired(true)
  );

export default {
  data,
  async execute(interaction) {
    //replying to slash commands
    const url = interaction.options.getString("url");
    // 토큰이 무효화되기 전에 3초 동안 상호 작용에 응답할 수 있습니다.
    await interaction.deferReply();
    //useCase
    const answer = await notion.getDBSchema();

    let ogResult = await ogScraper(url);
    ogResult = { ...ogResult, ogUrl: url }
    // result를 tagging함. 즉 rowData로 변환 getKeyword 가 toRowData 임
    const rowData = tagger.fromOgToRowData(ogResult)
    const createResult = await notion.createPage(rowData)

    if (createResult.status) {

      const body = await createResult.json()

      const embed = new MessageEmbed()
        .setColor("#EFFF00")
        .setTitle(rowData.title)
        .setURL(body.url)
        .addFields({ name: "Definition", value: rowData.description });

      await interaction.editReply({ embeds: [embed] });
    } else {
      // 실패 처리
      console.error(createResult);

      const embed = new MessageEmbed().setColor("#FF0000").setTitle(error);
      await interaction.editReply({ embeds: [embed] });
    }

    return url;
  },
};
