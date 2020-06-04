import {Command} from "./Command";
import {Message} from "eris";

export class Echo extends Command{
    protected run(msg: Message, args: Array<string>): void {
        msg.channel.createMessage(args.join(' '));
    }
}