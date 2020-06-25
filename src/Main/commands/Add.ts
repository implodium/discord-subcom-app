import {Command} from "./Command";
import {Message} from "eris";


export class Add extends Command {

    constructor() {
        super('add', 2,2);
    }

    protected run(msg: Message, args: Array<string>): void {
        if (Add.isValid(args)) {
            console.log(args[0])
            console.log(args[1])
        } else throw Error('Wrong Arrangement of Arguments')
    }

    private static isValid(args: Array<string>): boolean {
        return args[0].includes('@') && args[1].includes('#');
    }
}