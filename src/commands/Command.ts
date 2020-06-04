import {Message} from "eris";

export abstract class Command {

    public name: string;
    private readonly minArgs: number;
    private readonly maxArgs: number;

    protected constructor(name: string, minArgs: number, maxArgs: number) {
        this.name = name
        this.minArgs = minArgs;
        this.maxArgs = maxArgs;
    }


    public execute(msg: Message, args: Array<string>) {
        try {
            if (this.argsAreValid(args)) this.run(msg, args);
            else throw new Error('Invalid Arguments')
        } catch (e) {
            msg.channel.createMessage(e.message)
        }
    }

    protected argsAreValid(args: Array<string>) {
        return args.length < this.maxArgs && args.length > this.minArgs;
    }

    protected abstract run(msg: Message, args: Array<string>): void;
}