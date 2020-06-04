import {CommandClient} from "eris";
import {readFileSync} from 'fs';
import {Config} from "./Config";

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

    run() {
        return new Promise(async resolve => {
            await this.bot.connect()
            this.bot.on('ready', () => {
                resolve("connected");
            })
        })
    }

    readConfig(): Config {
        return JSON.parse(readFileSync('./config/config.json', 'utf-8'));
    }
}