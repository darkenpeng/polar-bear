import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import notion from "../notion/api.js";

import {ogScraper} from '../og.js';

//터미널에서 og로 받아오는 파일을 따로 빼서 얘만 node 파일명.js
const data = new SlashCommandBuilder()
    .setName('notion')
    .setDescription( "노션 데이터베이스에 자료를 추가")
    // .addChannelOption(option =>
    //     option.setName('destination')
    //         .setDescription('Select a channel'))
    .addStringOption(option =>
        option.setName('url')
            .setDescription('추가하려는 자료의 URL')
            .setRequired(true))


export default {
    data,
    async execute(interaction) {
        //replying to slash commands

        const url = interaction.options.getString('url');
        // console.log(url)
        
        // 토큰이 무효화되기 전에 3초 동안 상호 작용에 응답할 수 있습니다.
        await interaction.deferReply();

        const answer = await notion.getDBSchema();

        const result = await ogScraper(url);

        if(result.success){
            console.log(result)
            const embed = new MessageEmbed()
                .setColor('#EFFF00')
                .setTitle(answer.title[0].plain_text)
                .setURL(answer.url)
                .addFields(
                    { name: 'Definition', value: answer.created_time },
                );
            await interaction.editReply({ embeds: [embed] });
        } else {
            // 실패 처리
            console.error(result)
            
            const embed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle(error)
            await interaction.editReply({ embeds: [embed] });
        }
        
        return url
    },

};