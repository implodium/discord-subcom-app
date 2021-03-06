import {Command} from "./Command";
import {CategoryChannel, Constants, Member, Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {SubComMemberAssoziation} from "../model/SubComMemberAssoziation";
import {BotError} from "../exceptions/BotError";
import {SubCom} from "../model/SubCom";


export class Add extends Command {

    constructor() {
        super(
            'add',
            2,
            2,
            'add a member to a subcommunity'
        );
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        if (Add.isValid(args)) {
            const channel = msg.channel as TextChannel;
            const memberId = args[0].replace(/[^0-9]/g, '');
            const handleId = args[1].replace(/[^0-9]/g, '');
            const categoryId = channel.guild.channels.get(handleId) !== undefined
                ? (channel.guild.channels.get(handleId) as TextChannel).parentID
                : '-1';
            const subcom = await DataBase.subComRepository.get(categoryId as string);
            const category = channel.guild.channels.get(categoryId as string) as CategoryChannel;
            const disMember = channel.guild.members.get(memberId) as Member;

            if (Add.userIsPermitted(msg.author.id, subcom)) {
                await category.editPermission(
                    disMember.id,
                    Constants.Permissions.readMessageHistory
                    + Constants.Permissions.readMessages
                    + Constants.Permissions.voiceConnect
                    + Constants.Permissions.attachFiles
                    + Constants.Permissions.sendMessages
                    + Constants.Permissions.voiceUseVAD
                    + Constants.Permissions.addReactions
                    + Constants.Permissions.voiceSpeak,
                    0,
                    'member'
                );

                const subComMemberAssoziation = new SubComMemberAssoziation(
                    subcom,
                    memberId
                )

                await DataBase.subComMemberAssoziationRepository.insert(subComMemberAssoziation)
                    .catch(e => {
                        console.log(e)
                        throw new BotError('User already added')
                    })
            } else throw new BotError("You aren't permitted to do that")
        } else throw new BotError('Wrong Arrangement of Arguments')

        await msg.channel.createMessage('User has been added to the subcom')
    }

    private static isValid(args: Array<string>): boolean {
        return args[0].includes('@') && args[1].includes('#');
    }

    private static userIsPermitted(authorId: string, subCom: SubCom) {
        return authorId === subCom.ownerId;
    }
}
