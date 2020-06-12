import {GuildConfig} from "./GuildConfig";

export class Permission {
    public roleId: string;
    public count: number;
    public guildConfig: GuildConfig;

    constructor(roleId: string, count: number, guildConfig: GuildConfig) {
        this.roleId = roleId;
        this.count = count;
        this.guildConfig = guildConfig;
    }
}