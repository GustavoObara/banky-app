import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { getMemberData, upsetMemberData } from "#database";

new Command({
    name: "start",
    description: "Initialize your account and get your info",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const { member, user } = interaction;

        try {
            // Verificar se o membro já tem dados no Firebase
            const { memberDocument, memberData } = await getMemberData(member);
            
            // Se o membro já existe no Firebase
            if (memberData) {
                await interaction.reply({
                    content: `You are already registered!\nName: ${memberData.name}\nLogin: ${memberData.login}\nCoins: ${memberData.wallet?.coins ?? 0}\nExperience: ${memberData.exp ?? 0}`,
                    ephemeral: true
                });
                return;
            }

            // Se o membro não existe, criar um novo documento com dados iniciais
            const newData = {
                name: member.displayName || user.username, // Nome do membro ou username do Discord
                login: user.username, // Username do Discord
                wallet: {
                    coins: 0 // Inicia com 0 moedas
                },
                exp: 0 // Inicia com 0 de experiência
            };

            // Salvar os dados do novo membro no Firestore
            await upsetMemberData(member, newData);

            // Responder no Discord com os dados do usuário
            await interaction.reply({
                content: `Account created!\nName: ${newData.name}\nLogin: ${newData.login}\nCoins: ${newData.wallet.coins}\nExperience: ${newData.exp}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error creating your account.",
                ephemeral: true
            });
        }
    }
});
