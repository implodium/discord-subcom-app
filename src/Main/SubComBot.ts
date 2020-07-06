import {CommandClient} from "eris";
import {readFileSync} from 'fs';
import {ConfigInterface} from "./ConfigInterface";
import {Command} from "./commands/Command";
import {Settings} from "./commands/Settings";
import {DataBase} from "./controller/DataBase";
import {GuildConfig} from "./model/GuildConfig";
import {Create} from "./commands/Create";
import {Delete} from "./commands/Delete";
import {Add} from "./commands/Add";
import {Remove} from "./commands/Remove";

export class SubComBot {

    public readonly config: ConfigInterface;
    public readonly bot: CommandClient;
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

    readConfig(): ConfigInterface {
        return JSON.parse(readFileSync('./config/config.json', 'utf-8'));
    }

    private async init(): Promise<void> {
        this.bot.on('guildCreate', async guild => {
            await DataBase.guildConfigRepository.insert(new GuildConfig(guild.id, '.', '-1'))
        })

        this.initializeCommands();
    }

    private initializeCommands() {
        this.initializeCommand(new Create())
        this.initializeCommand(new Settings())
        this.initializeCommand(new Delete())
        this.initializeCommand(new Add())
        this.initializeCommand(new Remove())
    }

    private initializeCommand(command: Command) {
        this.bot.registerCommand(
            command.name,
            (msg, args) => command.execute(msg, args)
        );
    }

}