import {Command} from "./Command";
import {Message} from "eris";


export class Add extends Command {

    constructor() {
        super('add', 2,2);
    }

    protected run(msg: Message, args: Array<string>): void {
        console.log(args[0])
        console.log(args[1])
    }
}