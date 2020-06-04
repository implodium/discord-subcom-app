import {CommandClient} from "eris";
import {readFileSync} from 'fs';
import {Config} from "./Config";
import {Echo} from "./commands/Echo";
import {Command} from "./commands/Command";

export class SubComBot {

    private config: Config;
    public bot: CommandClient;

    constructor() {
        this.config = this.readConfig();
        this.bot = new CommandClient(
            this.config.token,
            {},
            {prefix: this.config.prefix}
        )
    }

    run(): Promise<string> {
        return new Promise(async resolve => {
            await this.bot.connect()
            this.bot.on('ready', () => {
                resolve("connected");
                this.init();
            })
        })
    }

    readConfig(): Config {
        return JSON.parse(readFileSync('./config/config.json', 'utf-8'));
    }

    private init() {
        this.initializeCommands();
    }

    private initializeCommands() {
        this.initializeCommand(new Echo())
    }

    private initializeCommand(command: Command) {
        this.bot.registerCommand(
            command.name,
            (msg, args) => command.execute(msg, args)
        );
    }

}