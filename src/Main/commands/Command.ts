import {Message} from "eris";
import {BotError} from "../exceptions/BotError";
import {SubComBot} from "../SubComBot";
import fs from "fs";

export abstract class Command {

    public name: string;
    private readonly minArgs: number;
    private readonly maxArgs: number;
    public readonly description: string;
    public readonly fullDescription: string;

    protected constructor(name: string, minArgs: number, maxArgs: number, description: string) {
        this.name = name
        this.minArgs = minArgs;
        this.maxArgs = maxArgs;
        this.description = description

        try {
            this.fullDescription = fs.readFileSync(`./src/Docs/commands/${this.name}.txt`,{encoding: "utf8"})
        } catch (e) {
            this.fullDescription = "";
            console.log(`Description File is missing for ${this.name}`)
        }
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
