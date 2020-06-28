import {Message} from "eris";
import {BotError} from "../exceptions/BotError";
import {SubComBot} from "../SubComBot";

export abstract class Command {

    public name: string;
    private readonly minArgs: number;
    private readonly maxArgs: number;

    protected constructor(name: string, minArgs: number, maxArgs: number) {
        this.name = name
        this.minArgs = minArgs;
        this.maxArgs = maxArgs;
    }


    public async execute(msg: Message, args: Array<string>) {
        try {
            if (this.argsAreValid(args)) await this.run(msg, args);
            else throw new BotError('Invalid Arguments')
        } catch (e) {
            if (e instanceof BotError) {
                await msg.channel.createMessage(e.message)
            } else {
                await msg.channel.createMessage(`Something went wrong! Please Contact the maintainer <@${SubComBot.instance.config.maintainer}>`)
                console.log(e.message)
            }
        }
    }

    protected argsAreValid(args: Array<string>) {
        return args.length <= this.maxArgs && args.length >= this.minArgs;
    }

    protected abstract run(msg: Message, args: Array<string>): void;
}