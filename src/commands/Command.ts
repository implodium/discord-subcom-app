import {Message} from "eris";

export abstract class Command {

    protected minArgs: number;
    protected maxArgs: number;

    constructor(minArgs: number, maxArgs: number) {
        this.minArgs = minArgs;
        this.maxArgs = maxArgs;
    }


    public execute(msg: Message, args: Array<string>) {
        try {
            if (this.argsAreValid(args)) this.run();
            else throw new Error('Invalid Arguments')
        } catch (e) {
            msg.channel.createMessage(e.message)
        }
    }

    protected argsAreValid(args: Array<string>) {
        return args.length < this.maxArgs && args.length > this.minArgs;
    }

    protected abstract run(): void;
}