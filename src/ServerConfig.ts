export class ServerConfig {
    public prefix: string;
    public guildId: string;

    constructor(guildId: string, prefix: string) {
        this.guildId = guildId;
        this.prefix = prefix;
    }
}