import {Repository} from "./Repository";
import {GuildConfig} from "../model/GuildConfig";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class GuildConfigRepository extends Repository<GuildConfig> {
    async delete(id: number): Promise<void> {
        await DataBase.query(
            'DELETE FROM guild_config WHERE guildid = $1',
            [id]
        )
    }

    async insert(object: GuildConfig): Promise<string> {
        await DataBase.query(
            'INSERT INTO guild_config (guildid, prefix) VALUES ($1, $2)',
            [object.guildId, object.prefix]
        )
        return object.guildId;
    }

    async get(id: string): Promise<GuildConfig> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM guild_config WHERE guildid = $1',
            [id]
        )

        return new GuildConfig(
            result.rows[0].guildid,
            result.rows[0].prefix
        )
    }

    async update(object: GuildConfig): Promise<number> {
        const result = await DataBase.query(
            "UPDATE guild_config SET prefix = $2 WHERE guildid = $1",
            [object.guildId, object.prefix]
        );

        return result.rowCount == 1 ? result.rowCount : -1;
    }

}