import {Command} from "./Command";
import {Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {GuildMember} from "../model/GuildMember";
import {Member} from "eris"
import {Permission} from "../model/Permission";

export class Add extends Command {

    public constructor() {
        super('add', 0, 2);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        if (msg.channel instanceof TextChannel) {
            if (await Add.memberIsPermitted(msg)) {

            }
        } else throw new Error('This feature is only supported in TextChannels')
    }

    private static async memberIsPermitted(msg: Message): Promise<boolean> {
        console.log("hello world");
        const guild = (msg.channel as TextChannel).guild;
        const member: GuildMember = await DataBase.memberRepository.get(msg.author.id)

        if (guild.members.get(member.id) instanceof Member) {
            const guildMember: Member = guild.members.get(member.id) as Member;

            console.log(guildMember.roles);
            guildMember.roles.forEach(async (role) => {
                let permission: Permission = await DataBase.permissionRepository.get(role)
            })
        }

        return false;
    }
}