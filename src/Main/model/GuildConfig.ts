import {Permission} from "./Permission";

export class GuildConfig {
    public prefix: string;
    public readonly guildId: string;
    public permissions: Map<string, Permission>;
    public adminRole: string;

    constructor(guildId: string, prefix: string, adminRole: string) {
        this.guildId = guildId;
        this.prefix = prefix;
        this.permissions = new Map<string, Permission>();
        this.adminRole = adminRole
    }
}