import {Repository} from "./Repository";
import {ServerConfig} from "../ServerConfig";
import {DataBase} from "./DataBase";
import {QueryResult} from "pg";

export class ConfigRepository extends Repository<ServerConfig> {
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async insert(object: ServerConfig): Promise<number> {
        await DataBase.query(
            'INSERT INTO config (guildid, prefix) VALUES ($1, $2)',
            [object.guildId, object.prefix]
        )
        return object.guildId;
    }

    async get(id: number): Promise<ServerConfig> {
        const result: QueryResult = await DataBase.query(
            'SELECT * FROM config WHERE guildid = $1',
            [id]
        )

        return new ServerConfig(
            result.rows[0].guildid,
            result.rows[0].prefix
        )
    }

    async update(object: ServerConfig): Promise<number> {
        const result = await DataBase.query(
            "UPDATE config SET prefix = $2 WHERE guildid = $1",
            [object.guildId, object.prefix]
        );

        return result.rowCount == 1 ? result.rowCount : -1;
    }

}