import {GuildConfig} from "./GuildConfig";

export class Permission {
    public readonly roleId: string;
    public readonly count: number;
    public readonly guildConfig: GuildConfig;

    constructor(roleId: string, count: number, guildConfig: GuildConfig) {
        this.roleId = roleId;
        this.count = count;
        this.guildConfig = guildConfig;
    }
}