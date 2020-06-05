export class ServerConfig {
    public prefix: string;
    public guildId: number;

    constructor(guildId: number, prefix: string) {
        this.guildId = guildId;
        this.prefix = prefix;
    }
}