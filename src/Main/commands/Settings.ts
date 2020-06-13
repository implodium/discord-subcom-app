import {Command} from "./Command";
import {Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {GuildConfig} from "../model/GuildConfig";
import {SubComBot} from "../SubComBot";

export class Settings extends Command {

    constructor() {
        super('settings', 1, 2);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
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
                    throw new Error("This feature is only supported in text channels")
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
                                await msg.channel.createMessage(text);
                            }
                        }
                    }
                }
                break;
            default:
                throw Error("Invalid Settings Property")
        }
    }

}