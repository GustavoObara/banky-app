import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { updateMemberData } from "#database";

new Command({
    name: "updmember",
    description: "Update member's exp and wallet",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const { member } = interaction;
        
        // Dados de atualização
        const updatedData = {
            exp: 50,  // Nova experiência
            wallet: {
                coins: 150 // Novas moedas
            }
        };

        try {
            // Atualizar dados do membro no Firestore
            await updateMemberData(member, updatedData);
            await interaction.reply({ content: "Member data has been updated!", ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Failed to update member data.", ephemeral: true });
        }
    }
});
