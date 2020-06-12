import {Permission} from "./Permission";

export class GuildConfig {
    public readonly prefix: string;
    public readonly guildId: string;
    public readonly permissions: Array<Permission>;

    constructor(guildId: string, prefix: string) {
        this.guildId = guildId;
        this.prefix = prefix;
        this.permissions = [];
    }
}