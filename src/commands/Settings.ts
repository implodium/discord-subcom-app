import {Command} from "./Command";
import {Message} from "eris";

export class Settings extends Command {

    constructor() {
        super('settings', 2, 2);
    }

    protected run(msg: Message, args: Array<string>): void {

    }

}