import {Command} from "./Command";
import {Message, TextChannel} from "eris";
import {DataBase} from "../controller/DataBase";
import {ServerConfig} from "../ServerConfig";

export class Settings extends Command {

    constructor() {
        super('settings', 1, 2);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        switch (args[0]) {
            case 'prefix':
                if (args.length == 1) {
                    if (msg.channel instanceof TextChannel)  {
                        const id: number = parseInt(msg.channel.guild.id);
                        const serverConfig: ServerConfig = await DataBase.configRepository.get(id);
                        await msg.channel.createMessage('**Prefix: **' + serverConfig.prefix);
                    } else {
                        throw new Error("This feature is only supported on text channels")
                    }
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