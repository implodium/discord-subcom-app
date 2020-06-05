import {Command} from "./Command";
import {Message} from "eris";
import {DataBase} from "../controller/DataBase";
import {ServerConfig} from "../ServerConfig";

export class Settings extends Command {

    constructor() {
        super('settings', 2, 3);
    }

    protected async run(msg: Message, args: Array<string>): Promise<void> {
        switch (args[0]) {
            case 'prefix':
                const prefix = args[1];
                const serverConfig: ServerConfig = await DataBase.configRepository.get(1);
                console.log(serverConfig)
                break;
            case 'role':
                await msg.channel.createMessage('changing the access role (Not jet implemented)');
                break;
            default:
                throw Error("Invalid Settings Property")
        }
    }

}