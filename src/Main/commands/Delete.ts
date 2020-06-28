import {Command} from "./Command";
import {CategoryChannel, Message, TextChannel, User} from "eris";
import {DataBase} from "../controller/DataBase";
import {SubCom} from "../model/SubCom";

export class Delete extends Command{
    constructor() {
        super('delete', 1, 1);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        const channel: TextChannel = msg.channel as TextChannel;
        const handleId: string = args[0].replace(/[^0-9]/g, '');
        const handle: TextChannel = channel.guild.channels.get(handleId) as TextChannel;
        const category: CategoryChannel = channel.guild.channels.get(handle.parentID as string) as CategoryChannel;
        const subcom: SubCom = await DataBase.subComRepository.get(handle.parentID as string)

        if (Delete.isPermitted(msg.author, subcom)) {
            category.channels.forEach(channel => {
                channel.delete().catch(console.log)
            })

            category.delete()
                .catch(console.log)
        }
    }

    private static isPermitted(author: User, subcom: SubCom) {
        return subcom.ownerId === author.id;
    }
}