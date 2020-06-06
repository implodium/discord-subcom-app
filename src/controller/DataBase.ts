import {ConfigRepository} from "./ConfigRepository";
import {Client, ClientConfig, QueryResult} from 'pg'

export class DataBase {
    public static configRepository = new ConfigRepository();
    private static config: ClientConfig = {
        user: 'app',
        host: 'localhost',
        database: 'db',
        password: 'app',
        port: 5432
    }

    static async query(query: string, args: Array<string | number> = []): Promise<QueryResult> {
        const client: Client = new Client(DataBase.config);

        return new Promise(async (resolve, reject) => {
            await client.connect();
            client.query(query, args,async(err, result) => {
                if (err) reject(err)
                else resolve(result)
                await client.end();
            })
        })
    }
}