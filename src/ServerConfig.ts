export class ServerConfig {
    public prefix: string;
    public serverId: number;

    constructor(serverId: number, prefix: string) {
        this.serverId = serverId;
        this.prefix = prefix;
    }
}