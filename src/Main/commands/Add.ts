import {Command} from "./Command";
import {Member, Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";


export class Add extends Command {

    constructor() {
        super('add', 2,2);
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
            const member = await DataBase.memberRepository.get(memberId);
            const disMember = channel.guild.members.get(memberId) as Member;
        } else throw Error('Wrong Arrangement of Arguments')
    }

    private static isValid(args: Array<string>): boolean {
        return args[0].includes('@') && args[1].includes('#');
    }
}