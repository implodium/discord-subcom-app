import {Command} from "./Command";
import {Member, Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {GuildConfig} from "../model/GuildConfig";
import {SubComBot} from "../SubComBot";
import {Permission} from "../model/Permission";
import {BotError} from "../exceptions/BotError";

export class Settings extends Command {

    constructor() {
        super('settings', 1, 4);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        const channel = msg.channel as TextChannel;
        const serverConfig: GuildConfig = await DataBase.guildConfigRepository.get(channel.guild.id);
        const discordMember: Member = channel.guild.members.get(msg.author.id) as Member;

        if (discordMember.roles.includes(serverConfig.adminRole) || msg.author.id === channel.guild.ownerID) {
            switch (args[0]) {
                case 'prefix':
                    if (msg.channel instanceof TextChannel) {
                        const id: string = msg.channel.guild.id
                        const serverConfig: GuildConfig = await DataBase.guildConfigRepository.get(id);

                        if (args.length === 1) {
                            await msg.channel.createMessage('**Prefix: **' + serverConfig.prefix);
                        } else if (args.length === 2) {
                            const prefix = args[1];
                            await msg.channel.createMessage(`Prefix was changed from ${serverConfig.prefix} to ${prefix}`)
                            serverConfig.prefix = prefix;
                            await DataBase.guildConfigRepository.update(serverConfig)
                            SubComBot.instance.bot.registerGuildPrefix(serverConfig.guildId, `${serverConfig.prefix}subcom `);
                        }
                    } else {
                        throw new BotError("This feature is only supported in text channels")
                    }
                    break;
                case 'role':
                    if (msg.channel instanceof TextChannel) {
                        const guildConfig: GuildConfig = await DataBase.guildConfigRepository.get(msg.channel.guild.id);
                        guildConfig.permissions = await DataBase.permissionRepository.getAll(guildConfig.guildId);

                        if (args.length === 1) {
                            if (guildConfig.permissions.size === 0) {
                                await msg.channel.createMessage("no permissions set");
                            } else {
                                let text: string = "**Permissions: ** \n";

                                for (let permission of guildConfig.permissions.values()) {
                                    text += `- Role <@&${permission.roleId}> is permitted to create ${permission.count} SubCommunities \n`;
                                }

                                await msg.channel.createMessage(text);
                            }
                        } else if (args.length > 1) {
                            switch (args[1]) {
                                case 'set':
                                    if (args.length === 4) {
                                        const permission: Permission = new Permission(
                                            args[2].replace(/[^0-9]/g, ''),
                                            parseInt(args[3]),
                                            guildConfig
                                        );

                                        if (guildConfig.permissions.get(permission.roleId) === undefined) {
                                            await DataBase.permissionRepository.insert(permission)
                                        } else {
                                            await DataBase.permissionRepository.update(permission)
                                        }
                                        guildConfig.permissions.set(permission.roleId, permission);
                                        await msg.channel.createMessage(
                                            `Role <@&${permission.roleId}> can now create 5 SubCommunities`
                                        );
                                    } else {
                                        throw new BotError("Invalid number of arguments")
                                    }
                                    break;
                                case 'delete':
                                    if (args.length === 3) {
                                        const id: string = args[2].replace(/[^0-9]/g, '');

                                        await DataBase.permissionRepository.delete(id);
                                        guildConfig.permissions.delete(id)
                                    } else throw new Error("Invalid number of arguments")
                                    break;
                                default:
                                    throw new BotError("Invalid Operation")
                            }
                        }
                    }
                    break;
                case 'admin-role':
                    if (msg.channel instanceof TextChannel) {
                        if (msg.author.id === channel.guild.ownerID) {
                            const id: string = msg.channel.guild.id
                            const serverConfig: GuildConfig = await DataBase.guildConfigRepository.get(id);

                            if (args.length === 1) {
                                await msg.channel.createMessage('**Admin-Role: **' + `<@&${serverConfig.adminRole}>`);
                            } else if (args.length === 2) {
                                const adminRole = args[1].replace(/[^0-9]/g, '');
                                await msg.channel.createMessage(`Prefix was changed from <@&${serverConfig.adminRole}> to <@&${adminRole}>`)
                                serverConfig.adminRole = adminRole;
                                await DataBase.guildConfigRepository.update(serverConfig)
                            }
                        } else throw new BotError('only the owner is permitted to assign the admin role')
                    } else {
                        throw new BotError("This feature is only supported in text channels")
                    }
                    break;
                default:
                    throw new Error("Invalid Settings Property")

            }

        } else throw new BotError('Only someone with the admin role can change the settings')
    }
}