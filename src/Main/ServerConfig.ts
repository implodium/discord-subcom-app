import {Permission} from "./model/Permission";

export class ServerConfig {
    public prefix: string;
    public guildId: string;
    public permissions: Array<Permission>;

    constructor(guildId: string, prefix: string) {
        this.guildId = guildId;
        this.prefix = prefix;
        this.permissions = [];
    }
}