import {Command} from "./Command";
import {CommandClient, Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {ServerConfig} from "../ServerConfig";
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
                    const serverConfig: ServerConfig = await DataBase.configRepository.get(id);

                    if (args.length == 1) {
                        await msg.channel.createMessage('**Prefix: **' + serverConfig.prefix);
                    } else if (args.length == 2) {
                        const prefix = args[1];
                        await msg.channel.createMessage(`Prefix was changed from ${serverConfig.prefix} to ${prefix}`)
                        serverConfig.prefix = prefix;
                        console.log(serverConfig)
                        await DataBase.configRepository.update(serverConfig)
                        SubComBot.instance.bot.registerGuildPrefix(serverConfig.guildId, `${serverConfig.prefix}subcom `);
                    }
                } else {
                    throw new Error("This feature is only supported in text channels")
                }
                break;
            case 'role':
                await msg.channel.createMessage('changing the access role (Not jet implemented)');
                break;
            default:
                throw Error("Invalid Settings Property")
        }
    }

}