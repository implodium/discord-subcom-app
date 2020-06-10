import {CommandClient} from "eris";
import {readFileSync} from 'fs';
import {GuildConfig} from "./model/GuildConfig";
import {Echo} from "./commands/Echo";
import {Command} from "./commands/Command";
import {Settings} from "./commands/Settings";
import {DataBase} from "./controller/DataBase";
import {ServerConfig} from "./ServerConfig";

export class SubComBot {

    private config: GuildConfig;
    public bot: CommandClient;
    public static instance: SubComBot;

    constructor() {
        this.config = this.readConfig();
        this.bot = new CommandClient(
            this.config.token,
            {},
            {prefix: this.config.prefix}
        )

        SubComBot.instance = this;
    }

    public run(): Promise<string> {
        return new Promise(async resolve => {
            await this.bot.connect()
            this.bot.on('ready', () => {
                this.init()
                resolve("connected");
            })
        })
    }

    readConfig(): GuildConfig {
        return JSON.parse(readFileSync('./config/config.json', 'utf-8'));
    }

    private async init(): Promise<void> {
        this.bot.on('guildCreate', async guild => {
            await DataBase.configRepository.insert(new ServerConfig(guild.id, '.'))
        })

        this.initializeCommands();
    }

    private initializeCommands() {
        this.initializeCommand(new Echo())
        this.initializeCommand(new Settings())
    }

    private initializeCommand(command: Command) {
        this.bot.registerCommand(
            command.name,
            (msg, args) => command.execute(msg, args)
        );
    }

}