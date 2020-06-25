import {Command} from "./Command";
import {CategoryChannel, Constants, Guild, Message, Role, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {GuildMember} from "../model/GuildMember";
import {Member} from "eris"
import {Permission} from "../model/Permission";
import {GuildConfig} from "../model/GuildConfig";
import {SubCom} from "../model/SubCom";

export class Add extends Command {

    public constructor() {
        super('add', 1, Number.MAX_VALUE);
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
                return await Add.initMember(msg);
            })


        if (msg.channel instanceof TextChannel) {
            if (await Add.memberIsPermitted(member, guild, guildConfig, msg)) {
                await Add.addSubCom(args.join(' '), member, guild);
                member.count++;
                await DataBase.memberRepository.update(member)
            } else {
                await msg.channel.createMessage('you have no subcoms left to create')
            }
        } else throw new Error('This feature is only supported in TextChannels')
    }

    private static async memberIsPermitted(member: GuildMember, guild: Guild, guildConfig: GuildConfig, msg: Message): Promise<boolean> {
        return member.count < await this.getCount(guild, msg, guildConfig);
    }

    private static async getCount(guild: Guild, msg: Message, guildConfig: GuildConfig) {
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

            return Math.max(...countPermissions);
        }

        return 0;
    }

    private static async initMember(msg: Message) {
        const member: GuildMember = new GuildMember(msg.author.id, 0)
        await DataBase.memberRepository.insert(member)
            .catch(console.log)
        return member;
    }

    private static async addSubCom(name: string, member: GuildMember, guild: Guild): Promise<void> {
        const defaultRole: Role = guild.roles.find(role => {
            return role.name === '@everyone'
        }) as Role;

        const category: CategoryChannel = await guild.createChannel(name, Constants.ChannelTypes.GUILD_CATEGORY, {
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
                    allow: Constants.Permissions.all
                        - Constants.Permissions.manageRoles
                        - Constants.Permissions.administrator,
                    deny: 0
                }
            ]
        })

        const channel = await guild.createChannel(`handle:${name}`, Constants.ChannelTypes.GUILD_TEXT, {
            parentID: category.id,
            permissionOverwrites: [
                {
                    id: defaultRole.id,
                    type: 'role',
                    deny: Constants.Permissions.all,
                    allow: 0
                },
                {
                    id: member.id,
                    type: 'member',
                    deny: Constants.Permissions.all,
                    allow: Constants.Permissions.readMessages + Constants.Permissions.readMessageHistory
                }
            ]
        })

        await channel.createMessage(
            'This channel is the handle of your sub community use it to edit your SubCommunity'
        ).catch(console.log)

        await DataBase.subComRepository.insert(new SubCom(
            category.id,
            category.name,
            member.id
        ));
    }
}