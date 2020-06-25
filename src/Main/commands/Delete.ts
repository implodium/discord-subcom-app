import {Command} from "./Command";
import {Message} from "eris";

export class Delete extends Command{
    constructor() {
        super('delete', 1, 1);
    }

    protected run(msg: Message, args: Array<string>): void {
        console.log(msg.author.id)
        console.log(args[0])
    }
}