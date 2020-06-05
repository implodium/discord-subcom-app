import {Repository} from "./Repository";
import {ServerConfig} from "../ServerConfig";
import {DataBase} from "./DataBase";

export class ConfigRepository extends Repository<ServerConfig> {
    async delete(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id: number): Promise<ServerConfig> {
        await DataBase.client.connect()

        return new Promise((resolve, reject) => {
            DataBase.client.query(
                'SELECT * FROM config WHERE guildid = $1',
                [id],
                (err, res) => {
                    if (res.rows.length < 1) reject('ServerConfig not found')
                    else resolve(new ServerConfig(res.rows[0].guildid, res.rows[0].prefix))
                    DataBase.client.end();
                }
            )
        })
    }

    async update(object: ServerConfig): Promise<number> {
        await DataBase.client.connect();

        return new Promise((resolve, reject) => {
            DataBase.client.query(
                'UPDATE CONFIG SET prefix = $1 WHERE guildid = $2',
                [object.prefix, object.guildId],
                (err, res) => {
                    if (err) {
                        reject(err.stack)
                    } else if (res.rowCount == 0) {
                        reject("ServerConfig doesn't exist")
                    } else {
                        resolve(res.rowCount)
                    }

                    DataBase.client.end();
                }
            )
        })
    }

    async insert(object: ServerConfig): Promise<number> {
        return Promise.resolve(0);
    }

}