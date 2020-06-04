import {Command} from "./Command";
import {Message} from "eris";

export class Echo extends Command{
    constructor() {
        super("echo", 0, Number.MAX_VALUE);
    }

    protected run(msg: Message, args: Array<string>): void {
        console.log(args);
        msg.channel.createMessage(args.join(' '));
    }
}