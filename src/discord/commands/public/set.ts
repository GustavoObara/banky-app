import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { upsetMemberData } from "#database";

new Command({
    name: "set",
    description: "Set up member data in the database",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const { member } = interaction;

        // Definir os dados iniciais do membro
        const data = {
            name: "Nome do Usuário",
            login: "LoginDoUsuario",
            wallet: {
                coins: 100 // Valor inicial de moedas
            },
            exp: 0 // Experiência inicial
        };

        try {
            // Inserir ou atualizar os dados do membro no Firestore
            await upsetMemberData(member, data);
            await interaction.reply({ content: "Member data has been set up!", ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Failed to set up member data.", ephemeral: true });
        }
    }
});
