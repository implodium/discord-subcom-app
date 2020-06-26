import {Command} from "./Command";
import {CategoryChannel, Constants, Member, Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";

export class Remove extends Command {

    constructor() {
        super('remove', 2, 2);
    }

    async run(msg: Message, args: Array<string>): Promise<void> {
        if (Remove.isValid(args)) {
            const channel = msg.channel as TextChannel;
            const memberId = args[0].replace(/[^0-9]/g, '');
            const handleId = args[1].replace(/[^0-9]/g, '');
            const categoryId = channel.guild.channels.get(handleId) !== undefined
                ? (channel.guild.channels.get(handleId) as TextChannel).parentID
                : '-1';
            const subcom = await DataBase.subComRepository.get(categoryId as string);
            const category = channel.guild.channels.get(categoryId as string) as CategoryChannel;
            const disMember = channel.guild.members.get(memberId) as Member;

            await category.editPermission(
                disMember.id,
                0,
                Constants.Permissions.readMessageHistory
                    + Constants.Permissions.readMessages
                    + Constants.Permissions.voiceConnect
                    + Constants.Permissions.attachFiles
                    + Constants.Permissions.sendMessages
                    + Constants.Permissions.voiceUseVAD
                    + Constants.Permissions.addReactions
                    + Constants.Permissions.voiceSpeak,
                'member'
            );

            await DataBase.subComMemberAssoziationRepository.delete(subcom.id, memberId)
                .catch(console.log)
        } else throw Error('Wrong Arrangement of Arguments')
    }

    private static isValid(args: Array<string>): boolean {
        return args[0].includes('@') && args[1].includes('#');
    }
}