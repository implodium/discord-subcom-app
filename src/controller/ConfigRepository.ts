import {Repository} from "./Repository";
import {ServerConfig} from "../ServerConfig";
import {DataBase} from "./DataBase";

export class ConfigRepository extends Repository<ServerConfig> {
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async insert(object: ServerConfig): Promise<number> {
        return Promise.resolve(0);
    }

    async get(id: number): Promise<ServerConfig> {
        return Promise.resolve(new ServerConfig(1, ";"));
    }

    async update(object: ServerConfig): Promise<number> {
        const result = await DataBase.query(
            "UPDATE config SET prefix = $2 WHERE guildid = $1",
            [object.guildId, object.prefix]
        );

        return result.rowCount == 1 ? result.rowCount : -1;
    }

}