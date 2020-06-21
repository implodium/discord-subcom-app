import {Command} from "./Command";
import {Constants, Guild, Message, Role, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {GuildMember} from "../model/GuildMember";
import {Member} from "eris"
import {Permission} from "../model/Permission";
import {GuildConfig} from "../model/GuildConfig";

export class Add extends Command {

    public constructor() {
        super('add', 0, 2);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        const guild = (msg.channel as TextChannel).guild;
        const guildConfig: GuildConfig = await DataBase.guildConfigRepository.get(guild.id)
            .catch(err => {
                console.log(err.stack)
                return new GuildConfig('-1', '-1')
            })

        const member: GuildMember = await DataBase.memberRepository.get(msg.author.id)
            .catch(async () => {
                return await Add.initMember(guild, msg, guildConfig);
            })


        if (msg.channel instanceof TextChannel) {
            if (await Add.memberIsPermitted(member)) {
                await Add.addSubCom('some name', member, guild);
                member.count--;
                await DataBase.memberRepository.update(member)
            } else {
                await msg.channel.createMessage('you have no subcoms left to create')
            }
        } else throw new Error('This feature is only supported in TextChannels')
    }

    private static async memberIsPermitted(member: GuildMember): Promise<boolean> {
        return member.count > 0;
    }

    private static async initMember(guild: Guild, msg: Message, guildConfig: GuildConfig) {
        let count: number = 0;

        if (guild.members.get(msg.author.id) !== undefined) {
            const roles: Array<string> = (guild.members.get(msg.author.id) as Member).roles
            let countPermissions: Array<number> = [];

            for (let role of roles) {
                let permission: Permission = await DataBase.permissionRepository.get(role)
                    .catch(async () => {
                        console.log("no permission for this role")
                        return new Permission('-1', -1, guildConfig)
                    })
                countPermissions.push(permission.count);
            }

            count = Math.max(...countPermissions);
        }

        const member: GuildMember = new GuildMember(msg.author.id, count)
        await DataBase.memberRepository.insert(member)
            .catch(console.log)
        return member;
    }

    private static async addSubCom(name: string, member: GuildMember, guild: Guild): Promise<string> {
        const defaultRole: Role = guild.roles.find(role => {
            return role.name === '@everyone'
        }) as Role;

        await guild.createChannel(name, Constants.ChannelTypes.GUILD_CATEGORY, {
            permissionOverwrites: [
                {
                    id: defaultRole.id,
                    type: 'role',
                    deny: Constants.Permissions.all,
                    allow: 0
                },
                {
                    id: member.id,
                    type: "member",
                    allow: Constants.Permissions.all,
                    deny: 0
                }
            ]
        })

        console.log("guild created")

        return "";
    }
}