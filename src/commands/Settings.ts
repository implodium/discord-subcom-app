import {Command} from "./Command";
import {Message} from "eris";

export class Settings extends Command {

    constructor() {
        super('settings', 2, 3);
    }

    protected run(msg: Message, args: Array<string>): void {
        switch (args[0]) {
            case 'prefix':
                msg.channel.createMessage('changing prefix');
                break;
            case 'role':
                msg.channel.createMessage('changing the access role (Not jet implemented)');
                break;
            default:
                throw Error("Invalid Settings Property")
        }
    }

}