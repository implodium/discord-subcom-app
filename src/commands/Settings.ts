import {Command} from "./Command";
import {Message} from "eris";
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
                    await msg.channel.createMessage('**Prefix: **');
                }
                console.log(args.length)
                const prefix = args[1];
                break;
            case 'role':
                await msg.channel.createMessage('changing the access role (Not jet implemented)');
                break;
            default:
                throw Error("Invalid Settings Property")
        }
    }

}